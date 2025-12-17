import { useCallback, useEffect, useRef, useState } from 'react';

export type UseWebSocketOptions = {
  retryInterval?: number; // ms base para backoff
  maxRetries?: number;
};

export function useWebSocket<T = any>(
  url: string,
  { retryInterval = 1000, maxRetries = 10 }: UseWebSocketOptions = {}
) {
  const wsRef = useRef<WebSocket | null>(null);
  const retriesRef = useRef(0);
  const closedByUserRef = useRef(false);

  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<T | null>(null);

  const connect = useCallback(() => {
    closedByUserRef.current = false;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      retriesRef.current = 0;
      setConnected(true);
      // console.log('WebSocket connected', url);
    };

    ws.onmessage = (evt: MessageEvent) => {
      try {
        const parsed = JSON.parse(evt.data) as T;
        setLastMessage(parsed);
      } catch {
        // fallback: if not JSON, keep raw string as any
        setLastMessage((evt.data as unknown) as T);
      }
    };

    ws.onclose = () => {
      setConnected(false);
      if (!closedByUserRef.current && retriesRef.current < maxRetries) {
        const backoff = retryInterval * Math.pow(2, retriesRef.current);
        retriesRef.current += 1;
        setTimeout(connect, backoff);
      }
    };

    ws.onerror = (_err) => {
      // onclose fará o reconnect; opcional: setConnected(false) aqui também
    };
  }, [url, retryInterval, maxRetries]);

  useEffect(() => {
    connect();
    return () => {
      closedByUserRef.current = true;
      try {
        wsRef.current?.close();
      } catch {}
    };
  }, [connect]);

  const send = useCallback((data: any): boolean => {
    try {
      const ws = wsRef.current;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(typeof data === 'string' ? data : JSON.stringify(data));
        return true;
      }
    } catch {
      /* ignore */
    }
    return false;
  }, []);

  const close = useCallback(() => {
    closedByUserRef.current = true;
    try {
      wsRef.current?.close();
    } catch {}
  }, []);

  return { connected, lastMessage, send, close } as const;
}

export default useWebSocket;