export default function ActionButtons({ onPass, onLike, disabled }) {
  return (
    <div className="actions">
      <button className="round-btn pass" onClick={onPass} disabled={disabled} aria-label="Rechazar">✕</button>
      <button className="round-btn like" onClick={onLike} disabled={disabled} aria-label="Pasear">🦴</button>
    </div>
  )
}
