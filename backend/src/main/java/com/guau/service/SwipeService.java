package com.guau.service;

import com.guau.event.MatchCreatedEvent;
import com.guau.model.Dog;
import com.guau.model.Rol;
import com.guau.model.Swipe;
import com.guau.model.Walker;
import com.guau.repo.DogRepository;
import com.guau.repo.MatchRepository;
import com.guau.repo.SwipeRepository;
import com.guau.repo.WalkerRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SwipeService {
    public record Resultado(boolean match, Walker walker, Dog dog) {}

    private final DogRepository dogs;
    private final WalkerRepository walkers;
    private final SwipeRepository swipes;
    private final MatchRepository matches;
    private final ApplicationEventPublisher publisher;

    public SwipeService(DogRepository dogs, WalkerRepository walkers, SwipeRepository swipes,
                        MatchRepository matches, ApplicationEventPublisher publisher) {
        this.dogs = dogs; this.walkers = walkers; this.swipes = swipes;
        this.matches = matches; this.publisher = publisher;
    }

    /** Perros que este paseador todavía no vio. */
    public List<Dog> perrosParaPaseador(Long walkerId) {
        walkers.findById(walkerId).orElseThrow(() -> new NoSuchElementException("Paseador " + walkerId));
        Set<Long> vistos = vistos(Rol.WALKER, walkerId);
        return dogs.findAll().stream().filter(d -> !vistos.contains(d.getId())).collect(Collectors.toList());
    }

    /** Paseadores que el dueño de este perro todavía no vio. */
    public List<Walker> paseadoresParaPerro(Long dogId) {
        dogs.findById(dogId).orElseThrow(() -> new NoSuchElementException("Perro " + dogId));
        Set<Long> vistos = vistos(Rol.DOG, dogId);
        return walkers.findAll().stream().filter(w -> !vistos.contains(w.getId())).collect(Collectors.toList());
    }

    private Set<Long> vistos(Rol rol, Long id) {
        return swipes.findByActorTipoAndActorId(rol, id).stream().map(Swipe::getObjetivoId).collect(Collectors.toSet());
    }

    /**
     * El actor (WALKER o DOG) elige LIKE/PASS sobre el otro lado.
     * Hay match cuando ambos se dieron LIKE mutuamente.
     */
    @Transactional
    public Resultado swipe(Rol actor, Long actorId, Long objetivoId, String accion) {
        Long walkerId = actor == Rol.WALKER ? actorId : objetivoId;
        Long dogId = actor == Rol.DOG ? actorId : objetivoId;
        Walker walker = walkers.findById(walkerId).orElseThrow(() -> new NoSuchElementException("Paseador " + walkerId));
        Dog dog = dogs.findById(dogId).orElseThrow(() -> new NoSuchElementException("Perro " + dogId));

        boolean like = "LIKE".equalsIgnoreCase(accion);
        Swipe s = swipes.findByActorTipoAndActorIdAndObjetivoId(actor, actorId, objetivoId)
                .orElseGet(() -> new Swipe(actor, actorId, objetivoId, like));
        s.setLike(like);
        swipes.save(s);

        if (!like) return new Resultado(false, walker, dog);

        Rol otro = actor == Rol.WALKER ? Rol.DOG : Rol.WALKER;
        boolean reciproco = swipes.findByActorTipoAndActorIdAndObjetivoId(otro, objetivoId, actorId)
                .map(Swipe::isLike).orElse(false);
        boolean match = reciproco && !matches.existsByWalkerIdAndDogId(walkerId, dogId);
        if (match) publisher.publishEvent(new MatchCreatedEvent(walkerId, walker.getNombre(), dogId, dog.getNombre()));
        return new Resultado(reciproco, walker, dog);
    }
}
