// Card según Figma: foto 340x340 arriba y texto debajo (título / subtítulo / detalle).
// Sirve para perros y para paseadores.
export default function ProfileCard({ photo, title, subtitle, detail }) {
  return (
    <article className="card">
      <img
        className="card-photo"
        src={photo}
        alt=""
        onError={(e) => { e.currentTarget.removeAttribute('src') }}
      />
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="card-sub">{subtitle}</p>
        {detail && <p className="card-detail">{detail}</p>}
      </div>
    </article>
  )
}

export const dogCardProps = (d) => ({
  photo: d.fotoUrl,
  title: `${d.nombre}, ${d.edad} años`,
  subtitle: `${d.barrio} · ${d.raza}`,
  detail: d.energia,
})

export const walkerCardProps = (w) => ({
  photo: w.fotoUrl,
  title: `${w.nombre}, ${w.edad} años`,
  subtitle: w.barrio,
  detail: `${w.experiencia} · ${w.disponibilidad}`,
})
