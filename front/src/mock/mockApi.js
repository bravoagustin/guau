// Backend simulado en memoria para la demo publicada (sin servidor).
// Replica las reglas de backend/.../SwipeService.java: zonas a pie, "ya vistos" y match recíproco.
import { DOGS, WALKERS, SEED_SWIPES } from './data.js'

const BARRIO_A_ZONA = {
  'nueva cordoba': 'Centro',
  guemes: 'Centro',
  cofico: 'Centro',
  'alta cordoba': 'Centro',
  'cerro de las rosas': 'Noroeste',
  'villa belgrano': 'Noroeste',
}

const normalizar = (s) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim()
export const zonaDe = (barrio) => (barrio?.trim() ? BARRIO_A_ZONA[normalizar(barrio)] ?? null : null)
const mismaZona = (a, b) => zonaDe(a) !== null && zonaDe(a) === zonaDe(b)

// Igual que los getters getZona() de las entidades Dog y Walker.
const conZona = (x) => ({ ...x, zona: zonaDe(x.barrio) })

export function createMockApi({ delayMs = 150 } = {}) {
  const swipes = SEED_SWIPES.map((s) => ({ ...s }))
  const respond = (fn) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        try { resolve(fn()) } catch (e) { reject(e) }
      }, delayMs))

  const findSwipe = (actor, actorId, objetivoId) =>
    swipes.find((s) => s.actor === actor && s.actorId === actorId && s.objetivoId === objetivoId)
  const vistos = (actor, id) => new Set(swipes.filter((s) => s.actor === actor && s.actorId === id).map((s) => s.objetivoId))
  const must = (list, id, label) => {
    const x = list.find((i) => i.id === id)
    if (!x) throw new Error(`${label} ${id} no existe`)
    return x
  }

  return {
    getDogs: () => respond(() => DOGS.map(conZona)),
    getWalkers: () => respond(() => WALKERS.map(conZona)),

    getDogsForWalker: (walkerId) => respond(() => {
      const walker = must(WALKERS, walkerId, 'Paseador')
      const v = vistos('WALKER', walkerId)
      return DOGS.filter((d) => !v.has(d.id) && mismaZona(walker.barrio, d.barrio)).map(conZona)
    }),

    getWalkersForDog: (dogId) => respond(() => {
      const dog = must(DOGS, dogId, 'Perro')
      const v = vistos('DOG', dogId)
      return WALKERS.filter((w) => !v.has(w.id) && mismaZona(dog.barrio, w.barrio)).map(conZona)
    }),

    swipe: (actor, actorId, objetivoId, accion) => respond(() => {
      const walkerId = actor === 'WALKER' ? actorId : objetivoId
      const dogId = actor === 'DOG' ? actorId : objetivoId
      const walker = must(WALKERS, walkerId, 'Paseador')
      const dog = must(DOGS, dogId, 'Perro')
      if (!mismaZona(walker.barrio, dog.barrio)) throw new Error('El paseo es a pie: tienen que estar en la misma zona')

      const like = String(accion).toUpperCase() === 'LIKE'
      const previo = findSwipe(actor, actorId, objetivoId)
      if (previo) previo.like = like
      else swipes.push({ actor, actorId, objetivoId, like })

      const otro = actor === 'WALKER' ? 'DOG' : 'WALKER'
      const reciproco = like && (findSwipe(otro, objetivoId, actorId)?.like ?? false)
      return { match: reciproco, walker: conZona(walker), dog: conZona(dog) }
    }),
  }
}
