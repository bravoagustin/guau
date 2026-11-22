// Punto único de acceso a datos. La demo publicada usa un backend simulado en el navegador
// (VITE_USE_MOCK=true); en desarrollo y con VITE_API_URL se habla con el backend Spring Boot real.
import * as http from './httpApi'
import { createMockApi } from './mock/mockApi'

export const isMock = import.meta.env.VITE_USE_MOCK === 'true'

const impl = isMock ? createMockApi() : http

export const getDogs = impl.getDogs
export const getWalkers = impl.getWalkers
export const getDogsForWalker = impl.getDogsForWalker
export const getWalkersForDog = impl.getWalkersForDog
export const swipe = impl.swipe
export const wakeServer = isMock ? () => {} : http.wakeServer
