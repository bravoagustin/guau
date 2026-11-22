import { useEffect, useState } from 'react'
import { isMock, wakeServer } from './api'
import RolePicker from './screens/RolePicker'
import SwipeScreen from './screens/SwipeScreen'

export default function App() {
  const [session, setSession] = useState(null) // { role: 'WALKER'|'DOG', profile }

  useEffect(() => { wakeServer() }, [])

  return (
    <main className="app">
      <h1 className="logo">GUAU</h1>
      {isMock && <p className="demo-badge">Modo demo: datos simulados en tu navegador</p>}
      {session
        ? <SwipeScreen key={`${session.role}-${session.profile.id}`} {...session} onExit={() => setSession(null)} />
        : <RolePicker onPick={setSession} />}
    </main>
  )
}
