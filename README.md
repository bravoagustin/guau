# Guau 🐾

Matching de paseadores y perros. Los paseadores eligen perros y los dueños eligen paseadores: si los dos se dan LIKE, ¡hay match!

**Demo:** https://bravoagustin.github.io/guau/

> El backend corre en un plan gratuito que se duerme tras ~15 minutos sin tráfico. Si la demo dice "Despertando el servidor…", esperá hasta un minuto y arranca sola.

## Estructura
- `backend/`: Spring Boot 3 (Java 21) + Spring Data JPA + H2 en memoria + eventos internos de Spring. Documentación Swagger incluida.
- `front/`: React + Vite, con tokens de diseño tomados de Figma.

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

## Deploy
- **Front → GitHub Pages**, con el workflow `.github/workflows/deploy-pages.yml`. La URL del backend se inyecta en el build desde la variable de repositorio `VITE_API_URL`.
- **Backend → Render** (Docker, plan gratuito), definido en `render.yaml`. La variable `CORS_ALLOWED_ORIGINS` define qué orígenes pueden llamar a la API (por defecto solo `http://localhost:5173`).
- La base es H2 en memoria: los datos de ejemplo se cargan en cada arranque (`DataLoader`) y los swipes se pierden al reiniciar. Es una decisión de demo, no de producción.
