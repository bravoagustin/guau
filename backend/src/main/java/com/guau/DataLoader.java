package com.guau;

import com.guau.model.Dog;
import com.guau.model.Rol;
import com.guau.model.Swipe;
import com.guau.model.Walker;
import com.guau.repo.DogRepository;
import com.guau.repo.SwipeRepository;
import com.guau.repo.WalkerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    private final DogRepository dogs;
    private final WalkerRepository walkers;
    private final SwipeRepository swipes;

    public DataLoader(DogRepository dogs, WalkerRepository walkers, SwipeRepository swipes) {
        this.dogs = dogs; this.walkers = walkers; this.swipes = swipes;
    }

    @Override
    public void run(String... args) {
        List<Dog> d = dogs.saveAll(List.of(
            new Dog("Firulais", 3, "Mestizo", "Nueva Córdoba", "Busca compañero de trote en el Parque Sarmiento.", "Necesita correr 5 km", "https://images.dog.ceo/breeds/labrador/n02099712_311.jpg", "Marcela"),
            new Dog("Luna", 5, "Border Collie", "Güemes", "Pastorea a sus humanos. Cero siestas.", "Necesita correr 10 km", "https://images.dog.ceo/breeds/collie-border/n02106166_678.jpg", "Jorge"),
            new Dog("Don Salchicha", 7, "Teckel", "Alta Córdoba", "Filósofo del sillón. Paseos cortos y con pausa.", "Solo quiere dormir al sol", "https://images.dog.ceo/breeds/dachshund/dachshund-in-jacket.jpg", "Rosa"),
            new Dog("Mate", 2, "Golden Retriever", "Cerro de las Rosas", "Ama los mates, los niños y los charcos.", "Paseo largo y pelota", "https://images.dog.ceo/breeds/retriever-golden/n02099601_6772.jpg", "Pablo"),
            new Dog("Fernet", 4, "Bulldog Francés", "Cofico", "Roncador profesional. Hincha de Talleres.", "Paseo tranqui de 20 min", "https://images.dog.ceo/breeds/bulldog-french/n02108915_3557.jpg", "Lucía"),
            new Dog("Chacha", 6, "Husky", "Villa Belgrano", "Sufre el calor cordobés, pero igual quiere salir.", "Necesita correr 8 km", "https://images.dog.ceo/breeds/husky/n02110185_4294.jpg", "Nico")
        ));
        List<Walker> w = walkers.saveAll(List.of(
            new Walker("Sofía", 24, "Nueva Córdoba", "Estudiante de veterinaria. Trota todas las mañanas.", "Paseos de hasta 10 km", "Mañanas", "https://i.pravatar.cc/300?img=47"),
            new Walker("Mateo", 29, "Güemes", "Adiestrador. Los perros nerviosos me aman.", "Perros grandes y enérgicos", "Tardes", "https://i.pravatar.cc/300?img=12"),
            new Walker("Camila", 31, "Cofico", "Paseos tranquis con parada en el café.", "Perros mayores y chicos", "Todo el día", "https://i.pravatar.cc/300?img=32"),
            new Walker("Lucas", 22, "Alta Córdoba", "Vago con carácter, pero responsable.", "Paseos cortos", "Noches", "https://i.pravatar.cc/300?img=15")
        ));

        // Datos de demo para que el match sea predecible (los likes "ya dados" por el otro lado):
        // - Firulais y Luna ya le dieron LIKE a Sofía  -> si Sofía (paseadora 1) les da LIKE: ¡match!
        swipes.save(new Swipe(Rol.DOG, d.get(0).getId(), w.get(0).getId(), true));
        swipes.save(new Swipe(Rol.DOG, d.get(1).getId(), w.get(0).getId(), true));
        // - Mateo y Camila ya le dieron LIKE a Don Salchicha -> si su dueño (perro 3) les da LIKE: ¡match!
        swipes.save(new Swipe(Rol.WALKER, w.get(1).getId(), d.get(2).getId(), true));
        swipes.save(new Swipe(Rol.WALKER, w.get(2).getId(), d.get(2).getId(), true));
    }
}
