package com.guau.repo;

import com.guau.model.DogMatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<DogMatch, Long> {
    boolean existsByWalkerIdAndDogId(Long walkerId, Long dogId);
}
