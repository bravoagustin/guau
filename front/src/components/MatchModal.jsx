export default function MatchModal({ walker, dog, onClose }) {
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-label="Es un match" onClick={(e) => e.stopPropagation()}>
        {/* TODO (Fase 2): reemplazar por un canvas de Three.js (hueso 3D + partículas) */}
        <div id="three-slot" className="three-slot">🦴</div>
        <h2>¡Es un Match!</h2>
        <div className="match-pair">
          <img src={walker.fotoUrl} alt={walker.nombre} onError={(e) => e.currentTarget.removeAttribute('src')} />
          <img src={dog.fotoUrl} alt={dog.nombre} onError={(e) => e.currentTarget.removeAttribute('src')} />
        </div>
        <p>{walker.nombre} y {dog.nombre} van a salir a pasear 🎉</p>
        <button className="cta" onClick={onClose}>Seguir paseando</button>
      </div>
    </div>
  )
}
