async function json(res) {
  if (!res.ok) throw new Error(`Error ${res.status}`)
  return res.json()
}

export const getDogs = () => fetch('/api/dogs').then(json)
export const getWalkers = () => fetch('/api/walkers').then(json)
// Pila de swipe de cada lado (los que todavía no vio)
export const getDogsForWalker = (walkerId) => fetch(`/api/walkers/${walkerId}/dogs`).then(json)
export const getWalkersForDog = (dogId) => fetch(`/api/dogs/${dogId}/walkers`).then(json)

// actor: 'WALKER' (objetivo = perro) | 'DOG' (objetivo = paseador); accion: 'LIKE' | 'PASS'
// -> { match: boolean, walker: {...}, dog: {...} }
export const swipe = (actor, actorId, objetivoId, accion) =>
  fetch('/api/swipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ actor, actorId, objetivoId, accion }),
  }).then(json)
