import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createMockApi, zonaDe } from './mockApi.js'

const api = () => createMockApi({ delayMs: 0 })

test('zonaDe ignora acentos y mayúsculas', () => {
  assert.equal(zonaDe('Nueva Córdoba'), 'Centro')
  assert.equal(zonaDe('  GÜEMES '), 'Centro')
  assert.equal(zonaDe('Villa Belgrano'), 'Noroeste')
  assert.equal(zonaDe('Marte'), null)
  assert.equal(zonaDe(''), null)
})

test('el paseador solo ve perros de su zona', async () => {
  const dogs = await api().getDogsForWalker(1) // Sofía, Nueva Córdoba -> Centro
  assert.deepEqual(dogs.map((d) => d.nombre), ['Firulais', 'Luna', 'Don Salchicha', 'Fernet'])
})

test('el dueño solo ve paseadores de su zona', async () => {
  const walkers = await api().getWalkersForDog(4) // Mate, Cerro de las Rosas -> Noroeste
  assert.deepEqual(walkers.map((w) => w.nombre), ['Valentina'])
})

test('Sofía le da LIKE a Firulais, que ya la había elegido: hay match', async () => {
  const res = await api().swipe('WALKER', 1, 1, 'LIKE')
  assert.equal(res.match, true)
  assert.equal(res.walker.nombre, 'Sofía')
  assert.equal(res.dog.nombre, 'Firulais')
})

test('LIKE sin reciprocidad no es match', async () => {
  const res = await api().swipe('WALKER', 1, 5, 'LIKE') // Fernet no eligió a Sofía
  assert.equal(res.match, false)
})

test('PASS nunca es match', async () => {
  const res = await api().swipe('WALKER', 1, 1, 'PASS')
  assert.equal(res.match, false)
})

test('el dueño de Don Salchicha matchea con Mateo (que ya le dio LIKE)', async () => {
  const res = await api().swipe('DOG', 3, 2, 'LIKE')
  assert.equal(res.match, true)
})

test('un perro ya visto no vuelve a aparecer en la pila', async () => {
  const a = api()
  await a.swipe('WALKER', 1, 1, 'PASS')
  const dogs = await a.getDogsForWalker(1)
  assert.ok(!dogs.some((d) => d.id === 1))
})

test('no se puede hacer swipe entre zonas distintas', async () => {
  await assert.rejects(api().swipe('WALKER', 1, 4, 'LIKE'), /misma zona/)
})

test('ids inexistentes fallan', async () => {
  await assert.rejects(api().getDogsForWalker(99), /no existe/)
})
