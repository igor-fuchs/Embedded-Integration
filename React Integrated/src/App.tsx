import './App.css';
import { useEffect, useState } from 'react';
import Header from './Header';
import useWebSocket from './hooks/useWebSocket';
import { type OpcUaMessage } from './util/interfaces';



function App() {
  // note o genérico para tipar as mensagens
  const { connected, lastMessage, send } = useWebSocket<OpcUaMessage>('ws://localhost:5000/ws/');
  const [history, setHistory] = useState<OpcUaMessage[]>([]);

  useEffect(() => {
    if (lastMessage) {
      setHistory(h => [lastMessage, ...h].slice(0, 200)); // mantem último 200 eventos
    }
  }, [lastMessage]);

  return (
    <>
      <Header />
      <div style={{ padding: 20 }}>
        <h2>OPC UA WebSocket Client</h2>
        <div>Status: {connected ? 'Conectado' : 'Desconectado'}</div>
        <button onClick={() => send({ type: 'subscribe', nodes: ['ns=3;s=...'] })}>
          Enviar mensagem ao servidor (exemplo)
        </button>

        <h3>Últimas notificações</h3>
        <ul>
          {history.map((msg, i) => (
            <li key={i}>
              <strong>{msg.node}</strong> — {new Date(msg.timestamp).toLocaleTimeString()} — {String(msg.value)}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
