import type { ChangeEvent } from 'react'
import './App.css'
import { useSessionStorage } from './hooks/useSessionStorage'

function App() {
  const [name, setName, clearName] = useSessionStorage('poc-name', '')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  return (
    <main className="app">
      <section className="panel">
        <p className="eyebrow">Session Storage POC</p>
        <h1>Session storage in one field.</h1>
        <p className="description">
          Type something, refresh the page, and the value stays available in
          this tab. Use clear to remove it from <code>sessionStorage</code>.
        </p>
        <label className="field">
          <span>Your name</span>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Type here"
          />
        </label>
        <div className="actions">
          <button type="button" onClick={clearName}>
            Clear
          </button>
        </div>
        <div className="hint">
          Stored value: <code>{name || '(empty)'}</code>
        </div>
      </section>
    </main>
  )
}

export default App
