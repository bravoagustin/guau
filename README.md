# Guau 🐾

Matching de paseadores y perros. Los paseadores eligen perros y los dueños eligen paseadores: si los dos se dan LIKE, ¡hay match!

## Ramas
- `main`: base estable (README, .gitignore).
- `backend`: Spring Boot 3 (Java 21) + H2 + eventos internos de Spring. Carpeta `backend/`.
- `front`: frontend + Design System. Carpeta `front/`.

Se trabaja en `backend` y `front` por separado y se integra en `main` al final.

## Backend (rama `backend`)
```
cd backend
mvn spring-boot:run
```
- Swagger: http://localhost:8080/swagger-ui.html
- `GET /api/dogs`, `GET /api/walkers`, `GET /api/matches`
- `GET /api/walkers/{id}/dogs` / `GET /api/dogs/{id}/walkers`: pila de swipe de cada lado
- `POST /api/swipes` con `{"actor":"WALKER"|"DOG","actorId":1,"objetivoId":1,"accion":"LIKE"|"PASS"}`
