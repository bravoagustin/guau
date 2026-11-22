import { useEffect, useState } from 'react'
import { getDogsForWalker, getWalkersForDog, swipe } from '../api'
import ProfileCard, { dogCardProps, walkerCardProps } from '../components/ProfileCard'
import ActionButtons from '../components/ActionButtons'
import MatchModal from '../components/MatchModal'
import useSlowNotice, { SLOW_MESSAGE } from '../useSlowNotice'

// role 'WALKER': el paseador ve perros. role 'DOG': el dueño ve paseadores.
export default function SwipeScreen({ role, profile, onExit }) {
  const [stack, setStack] = useState(null)
  const [error, setError] = useState(null)
  const [match, setMatch] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const load = role === 'WALKER' ? getDogsForWalker : getWalkersForDog
    load(profile.id).then(setStack).catch(() => setError('No se pudo cargar la lista.'))
  }, [role, profile.id])

  const slow = useSlowNotice(!error && stack === null)
  const current = stack?.[0]

  async function act(accion) {
    if (!current || busy) return
    setBusy(true)
    try {
      const res = await swipe(role, profile.id, current.id, accion)
      if (res.match) setMatch(res)
      setStack((s) => s.slice(1))
    } catch {
      setError('No se pudo registrar el swipe.')
    } finally {
      setBusy(false)
    }
  }

  const cardProps = role === 'WALKER' ? dogCardProps : walkerCardProps

  return (
    <>
      <div className="topbar">
        <span>{role === 'WALKER' ? 'Paseador' : 'Dueño de'}: {profile.nombre}{profile.zona ? ` · ${profile.zona}` : ''}</span>
        <button className="link-btn" onClick={onExit}>Cambiar</button>
      </div>
      {error && <p className="error">{error}</p>}
      {!error && stack === null && <p className="empty">{slow ? SLOW_MESSAGE : 'Cargando…'}</p>}
      {stack && current && (
        <>
          <ProfileCard {...cardProps(current)} />
          <ActionButtons onPass={() => act('PASS')} onLike={() => act('LIKE')} disabled={busy} />
        </>
      )}
      {stack && !current && <p className="empty">No hay más en tu zona. Los paseos son a pie 🐾</p>}
      {match && <MatchModal walker={match.walker} dog={match.dog} onClose={() => setMatch(null)} />}
    </>
  )
}
