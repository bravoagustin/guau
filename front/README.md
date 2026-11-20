# Front (React + Vite)

Diseño: Figma "bb" (Design System + card). Tokens en `src/tokens.css`.

```
cd front
npm install
npm run dev     # http://localhost:5173 (proxy de /api -> http://localhost:8080)
```
Requiere el backend corriendo en el puerto 8080 (rama `backend`).

## Pantallas
- `RolePicker`: "Soy paseador" / "Tengo un perro" y quién sos (demo, sin login).
- `SwipeScreen`: pila de cards + botones ✕ / 🦴. El paseador ve perros; el dueño ve paseadores.
- `MatchModal`: se abre cuando `POST /api/swipes` responde `match: true`. Tiene un slot (`#three-slot`) para el canvas de Three.js.

## Pendiente de diseño (no está en Figma todavía)
Botones de acción, modal de match y pantalla de rol usan los tokens pero con diseño provisorio.
