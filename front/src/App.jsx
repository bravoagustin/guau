import { useState } from 'react'
import RolePicker from './screens/RolePicker'
import SwipeScreen from './screens/SwipeScreen'

export default function App() {
  const [session, setSession] = useState(null) // { role: 'WALKER'|'DOG', profile }

  return (
    <main className="app">
      <h1 className="logo">GUAU</h1>
      {session
        ? <SwipeScreen key={`${session.role}-${session.profile.id}`} {...session} onExit={() => setSession(null)} />
        : <RolePicker onPick={setSession} />}
    </main>
  )
}
