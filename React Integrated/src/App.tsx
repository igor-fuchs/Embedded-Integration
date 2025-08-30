import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [plcData, setPlcData] = useState<string | null>(null)
  const [sendValue, setSendValue] = useState('')
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.6:8080')
    wsRef.current = ws

    ws.onopen = () => {
      console.log('WebSocket connected')
    }
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.plcData !== undefined) {
          setPlcData(data.plcData)
        }
      } catch (e) {
        console.error('Invalid message:', event.data)
      }
    }
    ws.onclose = () => {
      console.log('WebSocket disconnected')
    }
    return () => {
      ws.close()
    }
  }, [])

  const handleSend = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ sendValue }))
      setSendValue('')
    }
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <p>
          <strong>PLC Data:</strong> {plcData !== null ? plcData : 'Waiting for data...'}
        </p>
        <div style={{ marginTop: '1em' }}>
          <input
            type="text"
            value={sendValue}
            onChange={e => setSendValue(e.target.value)}
            placeholder="Send data to server"
          />
          <button onClick={handleSend} disabled={!sendValue}>
            Send
          </button>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
