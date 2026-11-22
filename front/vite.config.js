import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El backend (Spring Boot) corre en :8080. El proxy evita problemas de CORS en desarrollo.
// En producción el front se publica en GitHub Pages bajo /guau/ y llama al backend vía VITE_API_URL.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/guau/' : '/',
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:8080' } },
}))
