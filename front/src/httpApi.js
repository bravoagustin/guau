// En local queda vacío y el proxy de Vite resuelve /api. En producción: URL del backend, sin barra final.
const BASE = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

async function json(res) {
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export const getDogs = () => fetch(`${BASE}/api/dogs`).then(json)
export const getWalkers = () => fetch(`${BASE}/api/walkers`).then(json)
// Pila de swipe de cada lado (los que todavía no vio)
export const getDogsForWalker = (walkerId) => fetch(`${BASE}/api/walkers/${walkerId}/dogs`).then(json)
export const getWalkersForDog = (dogId) => fetch(`${BASE}/api/dogs/${dogId}/walkers`).then(json)

// actor: 'WALKER' (objetivo = perro) | 'DOG' (objetivo = paseador); accion: 'LIKE' | 'PASS'
// -> { match: boolean, walker: {...}, dog: {...} }
export const swipe = (actor, actorId, objetivoId, accion) =>
  fetch(`${BASE}/api/swipes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actor, actorId, objetivoId, accion }),
  }).then(json)

// El backend gratuito se duerme por inactividad: lo despertamos apenas carga la página.
export const wakeServer = () => { if (BASE) fetch(`${BASE}/api/dogs`).catch(() => {}) }
