# Guau 🐾

Matching de paseadores y perros. Los paseadores eligen perros y los dueños eligen paseadores: si los dos se dan LIKE, ¡hay match!

**Demo:** https://bravoagustin.github.io/guau/

> La demo publicada corre en **modo mock**: el front incluye un backend simulado en el navegador (`front/src/mock/`) que replica las reglas del backend real (zonas a pie, pila de "ya vistos" y match recíproco). Así abre al instante, sin servidor. El backend real de Spring Boot está en `backend/` y se puede correr en local (ver abajo).
> Para probar el flujo de match: como paseador elegí **Sofía** y dale LIKE a **Firulais** o **Luna**, que ya la habían elegido.

## Estructura
- `backend/`: Spring Boot 3 (Java 21) + Spring Data JPA + H2 en memoria + eventos internos de Spring. Documentación Swagger incluida.
- `front/`: React + Vite, con tokens de diseño tomados de Figma. `src/api.js` elige entre el backend real (`httpApi.js`) y el simulado (`mock/mockApi.js`).

## Cómo correrlo en local

Backend (puerto 8080):
```
cd backend
mvn spring-boot:run
```
- Swagger: http://localhost:8080/swagger-ui.html
- `GET /api/dogs`, `GET /api/walkers`, `GET /api/matches`
- `GET /api/walkers/{id}/dogs` / `GET /api/dogs/{id}/walkers`: pila de swipe de cada lado
- `POST /api/swipes` con `{"actor":"WALKER"|"DOG","actorId":1,"objetivoId":1,"accion":"LIKE"|"PASS"}`

Front (puerto 5173, con proxy de `/api` al backend):
```
cd front
npm install
npm run dev
```

## Tests
```
cd front && npm test      # lógica del backend simulado (node:test, sin dependencias)
cd backend && mvn test    # CORS y contexto de Spring
```

## Deploy
- **Front → GitHub Pages**, con el workflow `.github/workflows/deploy-pages.yml` (corre los tests y publica). Por defecto compila en modo mock (`VITE_USE_MOCK=true`).
- **Usar el backend real en la demo (opcional):** desplegar `backend/` con el `Dockerfile` o el blueprint `render.yaml` y cargar la URL en la variable de repositorio `VITE_API_URL`. Con esa variable definida, el workflow compila contra el backend real. Configurar `CORS_ALLOWED_ORIGINS=https://bravoagustin.github.io` en el backend.
- La base del backend es H2 en memoria: los datos de ejemplo se cargan en cada arranque (`DataLoader`) y los swipes se pierden al reiniciar. Es una decisión de demo, no de producción.
