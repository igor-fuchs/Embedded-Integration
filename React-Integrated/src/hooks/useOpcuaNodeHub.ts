import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr';

// ============================================================================
// Types & Interfaces
// ============================================================================

/** Represents an OPC UA node response from the server */
export interface OpcuaNodeResponse {
  name: string;
  value?: unknown;
  dataType?: string;
  timestamp?: string;
  [key: string]: unknown;
}

/** Connection status states */
export type ConnectionStatus = 
  | 'disconnected' 
  | 'connecting' 
  | 'connected' 
  | 'reconnecting' 
  | 'error';

/** Hub event names matching the backend IOpcuaNodeHubClient interface */
const HubEvents = {
  NODE_CREATED: 'NodeCreated',
  NODE_UPDATED: 'NodeUpdated',
  NODE_DELETED: 'NodeDeleted',
} as const;

/** Event handler callbacks */
interface OpcuaNodeHubEventHandlers {
  onNodeCreated?: (node: OpcuaNodeResponse) => void;
  onNodeUpdated?: (node: OpcuaNodeResponse) => void;
  onNodeDeleted?: (nodeName: string) => void;
  onConnectionChange?: (status: ConnectionStatus) => void;
  onError?: (error: Error) => void;
}

/** Hook configuration options */
interface UseOpcuaNodeHubConfig {
  /** Hub URL endpoint */
  hubUrl?: string;
  /** Enable automatic reconnection */
  autoReconnect?: boolean;
  /** Delay between reconnection attempts (ms) */
  reconnectDelayMs?: number;
  /** Maximum reconnection attempts (0 = infinite) */
  maxReconnectAttempts?: number;
  /** Enable connection (set false to defer connection) */
  enabled?: boolean;
  /** Log level for SignalR */
  logLevel?: LogLevel;
}

/** Hook return type */
interface UseOpcuaNodeHubReturn {
  /** Current connection status */
  status: ConnectionStatus;
  /** Whether the connection is active */
  isConnected: boolean;
  /** Current error message, if any */
  error: string | null;
  /** Manually connect to the hub */
  connect: () => Promise<void>;
  /** Manually disconnect from the hub */
  disconnect: () => Promise<void>;
  /** Raw SignalR connection (for advanced use cases) */
  connection: HubConnection | null;
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_CONFIG: Required<UseOpcuaNodeHubConfig> = {
  hubUrl: 'http://localhost:5000/hubs/opcua-nodes',
  autoReconnect: true,
  reconnectDelayMs: 5000,
  maxReconnectAttempts: 10,
  enabled: true,
  logLevel: LogLevel.Warning,
};

// ============================================================================
// Hook Implementation
// ============================================================================

/**
 * Custom hook for managing SignalR connection to OPC UA Node Hub.
 * 
 * @param handlers - Event handler callbacks for node events
 * @param config - Connection configuration options
 * @returns Connection state and control methods
 * 
 * @example
 * ```tsx
 * const { status, isConnected, connect, disconnect } = useOpcuaNodeHub({
 *   onNodeUpdated: (node) => console.log('Updated:', node),
 *   onConnectionChange: (status) => console.log('Status:', status),
 * }, {
 *   enabled: isSimulationRunning,
 * });
 * ```
 */
export function useOpcuaNodeHub(
  handlers: OpcuaNodeHubEventHandlers = {},
  config: UseOpcuaNodeHubConfig = {}
): UseOpcuaNodeHubReturn {
  // Merge config with defaults
  const mergedConfig = useMemo(
    () => ({ ...DEFAULT_CONFIG, ...config }),
    [config]
  );

  const {
    hubUrl,
    autoReconnect,
    reconnectDelayMs,
    maxReconnectAttempts,
    enabled,
    logLevel,
  } = mergedConfig;

  // State
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  // Refs for stable references
  const connectionRef = useRef<HubConnection | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const handlersRef = useRef(handlers);
  const isManualDisconnectRef = useRef(false);

  // Keep handlers ref updated
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  // Derived state
  const isConnected = status === 'connected';

  /**
   * Updates connection status and notifies handler
   */
  const updateStatus = useCallback((newStatus: ConnectionStatus, errorMsg?: string) => {
    setStatus(newStatus);
    
    if (errorMsg) {
      setError(errorMsg);
    } else if (newStatus === 'connected') {
      setError(null);
    }

    handlersRef.current.onConnectionChange?.(newStatus);
  }, []);

  /**
   * Clears any pending reconnection timeout
   */
  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  /**
   * Schedules a reconnection attempt
   */
  const scheduleReconnect = useCallback(() => {
    if (!autoReconnect || isManualDisconnectRef.current) return;

    if (maxReconnectAttempts > 0 && reconnectAttemptsRef.current >= maxReconnectAttempts) {
      updateStatus('error', `Max reconnection attempts (${maxReconnectAttempts}) reached`);
      handlersRef.current.onError?.(new Error('Max reconnection attempts reached'));
      return;
    }

    clearReconnectTimeout();
    
    reconnectTimeoutRef.current = setTimeout(() => {
      reconnectAttemptsRef.current++;
      connect();
    }, reconnectDelayMs);
  }, [autoReconnect, maxReconnectAttempts, reconnectDelayMs, clearReconnectTimeout, updateStatus]);

  /**
   * Creates and configures a new SignalR connection
   */
  const createConnection = useCallback((): HubConnection => {
    const connection = new HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: (retryContext) => {
          // Exponential backoff with max delay
          const delay = Math.min(
            reconnectDelayMs * Math.pow(1.5, retryContext.previousRetryCount),
            30000
          );
          return delay;
        },
      })
      .configureLogging(logLevel)
      .build();

    // Register hub event handlers
    connection.on(HubEvents.NODE_CREATED, (node: OpcuaNodeResponse) => {
      handlersRef.current.onNodeCreated?.(node);
    });

    connection.on(HubEvents.NODE_UPDATED, (node: OpcuaNodeResponse) => {
      handlersRef.current.onNodeUpdated?.(node);
    });

    connection.on(HubEvents.NODE_DELETED, (nodeName: string) => {
      handlersRef.current.onNodeDeleted?.(nodeName);
    });

    // Connection lifecycle handlers
    connection.onclose((err) => {
      if (isManualDisconnectRef.current) {
        updateStatus('disconnected');
        return;
      }

      const errorMessage = err?.message ?? 'Connection closed unexpectedly';
      updateStatus('disconnected', errorMessage);
      handlersRef.current.onError?.(err ?? new Error(errorMessage));
      scheduleReconnect();
    });

    connection.onreconnecting((err) => {
      updateStatus('reconnecting', err?.message);
    });

    connection.onreconnected(() => {
      reconnectAttemptsRef.current = 0;
      updateStatus('connected');
    });

    return connection;
  }, [hubUrl, reconnectDelayMs, logLevel, updateStatus, scheduleReconnect]);

  /**
   * Connects to the SignalR hub
   */
  const connect = useCallback(async (): Promise<void> => {
    // Prevent duplicate connections
    if (connectionRef.current?.state === HubConnectionState.Connected) {
      return;
    }

    // Stop existing connection if any
    if (connectionRef.current?.state === HubConnectionState.Connecting) {
      return;
    }

    isManualDisconnectRef.current = false;
    clearReconnectTimeout();
    updateStatus('connecting');

    try {
      // Create new connection if needed
      if (!connectionRef.current || connectionRef.current.state === HubConnectionState.Disconnected) {
        connectionRef.current = createConnection();
      }

      await connectionRef.current.start();
      
      reconnectAttemptsRef.current = 0;
      updateStatus('connected');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect';
      updateStatus('error', errorMessage);
      handlersRef.current.onError?.(err instanceof Error ? err : new Error(errorMessage));
      scheduleReconnect();
    }
  }, [clearReconnectTimeout, createConnection, updateStatus, scheduleReconnect]);

  /**
   * Disconnects from the SignalR hub
   */
  const disconnect = useCallback(async (): Promise<void> => {
    isManualDisconnectRef.current = true;
    clearReconnectTimeout();
    reconnectAttemptsRef.current = 0;

    if (connectionRef.current) {
      try {
        await connectionRef.current.stop();
      } catch (err) {
        console.error('[OpcuaNodeHub] Error during disconnect:', err);
      }
      connectionRef.current = null;
    }

    updateStatus('disconnected');
  }, [clearReconnectTimeout, updateStatus]);

  // Auto-connect effect
  useEffect(() => {
    if (enabled) {
      connect();
    } else {
      disconnect();
    }

    return () => {
      isManualDisconnectRef.current = true;
      clearReconnectTimeout();
      
      connectionRef.current?.stop().catch((err) => {
        console.error('[OpcuaNodeHub] Cleanup error:', err);
      });
    };
  }, [enabled]); // Intentionally minimal deps - connect/disconnect are stable

  return {
    status,
    isConnected,
    error,
    connect,
    disconnect,
    connection: connectionRef.current,
  };
}