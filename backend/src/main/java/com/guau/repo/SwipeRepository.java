package com.guau.repo;

import com.guau.model.Rol;
import com.guau.model.Swipe;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SwipeRepository extends JpaRepository<Swipe, Long> {
    Optional<Swipe> findByActorTipoAndActorIdAndObjetivoId(Rol actorTipo, Long actorId, Long objetivoId);
    List<Swipe> findByActorTipoAndActorId(Rol actorTipo, Long actorId);
}
