export interface OpcUaMessage {
  node: string;
  timestamp: string; // ou Date, mas vindo por JSON é string
  value: unknown;
}