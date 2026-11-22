// Mismos datos de ejemplo que backend/.../DataLoader.java (los ids coinciden con los que asigna la base: 1..n).
export const DOGS = [
  { id: 1, nombre: 'Firulais', edad: 3, raza: 'Mestizo', barrio: 'Nueva Córdoba', bio: 'Busca compañero de trote en el Parque Sarmiento.', energia: 'Necesita correr 5 km', fotoUrl: 'https://images.dog.ceo/breeds/labrador/n02099712_311.jpg', duenoNombre: 'Marcela' },
  { id: 2, nombre: 'Luna', edad: 5, raza: 'Border Collie', barrio: 'Güemes', bio: 'Pastorea a sus humanos. Cero siestas.', energia: 'Necesita correr 10 km', fotoUrl: 'https://images.dog.ceo/breeds/collie-border/n02106166_678.jpg', duenoNombre: 'Jorge' },
  { id: 3, nombre: 'Don Salchicha', edad: 7, raza: 'Teckel', barrio: 'Alta Córdoba', bio: 'Filósofo del sillón. Paseos cortos y con pausa.', energia: 'Solo quiere dormir al sol', fotoUrl: 'https://images.dog.ceo/breeds/dachshund/dachshund-in-jacket.jpg', duenoNombre: 'Rosa' },
  { id: 4, nombre: 'Mate', edad: 2, raza: 'Golden Retriever', barrio: 'Cerro de las Rosas', bio: 'Ama los mates, los niños y los charcos.', energia: 'Paseo largo y pelota', fotoUrl: 'https://images.dog.ceo/breeds/retriever-golden/n02099601_6772.jpg', duenoNombre: 'Pablo' },
  { id: 5, nombre: 'Fernet', edad: 4, raza: 'Bulldog Francés', barrio: 'Cofico', bio: 'Roncador profesional. Hincha de Talleres.', energia: 'Paseo tranqui de 20 min', fotoUrl: 'https://images.dog.ceo/breeds/bulldog-french/n02108915_3557.jpg', duenoNombre: 'Lucía' },
  { id: 6, nombre: 'Chacha', edad: 6, raza: 'Husky', barrio: 'Villa Belgrano', bio: 'Sufre el calor cordobés, pero igual quiere salir.', energia: 'Necesita correr 8 km', fotoUrl: 'https://images.dog.ceo/breeds/husky/n02110185_4294.jpg', duenoNombre: 'Nico' },
]

export const WALKERS = [
  { id: 1, nombre: 'Sofía', edad: 24, barrio: 'Nueva Córdoba', bio: 'Estudiante de veterinaria. Trota todas las mañanas.', experiencia: 'Paseos de hasta 10 km', disponibilidad: 'Mañanas', fotoUrl: 'https://i.pravatar.cc/300?img=47' },
  { id: 2, nombre: 'Mateo', edad: 29, barrio: 'Güemes', bio: 'Adiestrador. Los perros nerviosos me aman.', experiencia: 'Perros grandes y enérgicos', disponibilidad: 'Tardes', fotoUrl: 'https://i.pravatar.cc/300?img=12' },
  { id: 3, nombre: 'Camila', edad: 31, barrio: 'Cofico', bio: 'Paseos tranquis con parada en el café.', experiencia: 'Perros mayores y chicos', disponibilidad: 'Todo el día', fotoUrl: 'https://i.pravatar.cc/300?img=32' },
  { id: 4, nombre: 'Lucas', edad: 22, barrio: 'Alta Córdoba', bio: 'Vago con carácter, pero responsable.', experiencia: 'Paseos cortos', disponibilidad: 'Noches', fotoUrl: 'https://i.pravatar.cc/300?img=15' },
  { id: 5, nombre: 'Valentina', edad: 27, barrio: 'Villa Belgrano', bio: 'Sale con los perros del cerro al atardecer.', experiencia: 'Paseos por la zona noroeste', disponibilidad: 'Tardes', fotoUrl: 'https://i.pravatar.cc/300?img=5' },
]

// Likes "ya dados" por el otro lado, para que el match sea predecible (igual que el DataLoader):
// - Firulais y Luna ya le dieron LIKE a Sofía      -> si Sofía les da LIKE: match.
// - Mateo y Camila ya le dieron LIKE a Don Salchicha -> si su dueño les da LIKE: match.
export const SEED_SWIPES = [
  { actor: 'DOG', actorId: 1, objetivoId: 1, like: true },
  { actor: 'DOG', actorId: 2, objetivoId: 1, like: true },
  { actor: 'WALKER', actorId: 2, objetivoId: 3, like: true },
  { actor: 'WALKER', actorId: 3, objetivoId: 3, like: true },
]
