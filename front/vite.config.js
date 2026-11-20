import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// El backend (Spring Boot) corre en :8080. El proxy evita problemas de CORS en desarrollo.
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:8080' } },
})
