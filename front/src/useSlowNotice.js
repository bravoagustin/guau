import { useEffect, useState } from 'react'

// true si `loading` lleva más de `ms` sin resolverse (ej. backend gratuito despertando).
export default function useSlowNotice(loading, ms = 3000) {
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    if (!loading) { setSlow(false); return }
    const t = setTimeout(() => setSlow(true), ms)
    return () => clearTimeout(t)
  }, [loading, ms])
  return slow
}

export const SLOW_MESSAGE = 'Despertando el servidor, puede tardar hasta 1 minuto… 🐾'
