import { useEffect, useState } from 'react'
import { getDogs, getWalkers } from '../api'
import useSlowNotice, { SLOW_MESSAGE } from '../useSlowNotice'

// Pantalla inicial: "Soy paseador" o "Tengo un perro", y quién sos (demo, sin login).
export default function RolePicker({ onPick }) {
  const [mode, setMode] = useState(null) // null | 'WALKER' | 'DOG'
  const [list, setList] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const slow = useSlowNotice(loading)

  useEffect(() => {
    if (!mode) return
    setError(null)
    setLoading(true)
    const load = mode === 'WALKER' ? getWalkers : getDogs
    load()
      .then(setList)
      .catch(() => setError('No se pudo conectar con el servidor. Probá de nuevo en unos segundos.'))
      .finally(() => setLoading(false))
  }, [mode])

  if (!mode) {
    return (
      <section className="picker">
        <h2>¿Quién sos?</h2>
        <button className="pick-btn primary" onClick={() => setMode('WALKER')}>
          Soy paseador <small>Elegí perros para pasear</small>
        </button>
        <button className="pick-btn" onClick={() => setMode('DOG')}>
          Tengo un perro <small>Elegí paseador para tu perro</small>
        </button>
      </section>
    )
  }

  return (
    <section className="picker">
      <h2>{mode === 'WALKER' ? '¿Qué paseador sos?' : '¿Cuál es tu perro?'}</h2>
      {error && <p className="error">{error}</p>}
      {loading && <p className="empty">{slow ? SLOW_MESSAGE : 'Cargando…'}</p>}
      {list.map((x) => (
        <button key={x.id} className="pick-btn" onClick={() => onPick({ role: mode, profile: x })}>
          {x.nombre}
          <small>{x.barrio}{x.zona ? ` · ${x.zona}` : ''}</small>
        </button>
      ))}
      <button className="link-btn" onClick={() => setMode(null)}>← Volver</button>
    </section>
  )
}
