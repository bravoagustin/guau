package com.guau.web;

import com.guau.model.Dog;
import com.guau.model.DogMatch;
import com.guau.model.Rol;
import com.guau.model.Walker;
import com.guau.repo.DogRepository;
import com.guau.repo.MatchRepository;
import com.guau.repo.WalkerRepository;
import com.guau.service.SwipeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
@Tag(name = "Guau", description = "Paseadores, perros, swipes y matches")
public class DogController {
    private final DogRepository dogs;
    private final WalkerRepository walkers;
    private final MatchRepository matches;
    private final SwipeService swipeService;

    public DogController(DogRepository dogs, WalkerRepository walkers, MatchRepository matches, SwipeService swipeService) {
        this.dogs = dogs; this.walkers = walkers; this.matches = matches; this.swipeService = swipeService;
    }

    @Operation(summary = "Lista todos los perros")
    @GetMapping("/dogs")
    public List<Dog> perros() { return dogs.findAll(); }

    @Operation(summary = "Lista todos los paseadores")
    @GetMapping("/walkers")
    public List<Walker> paseadores() { return walkers.findAll(); }

    @Operation(summary = "Perros que el paseador todavía no vio (su pila de swipe)")
    @GetMapping("/walkers/{walkerId}/dogs")
    public List<Dog> perrosParaPaseador(@PathVariable Long walkerId) {
        try { return swipeService.perrosParaPaseador(walkerId); }
        catch (NoSuchElementException e) { throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage()); }
    }

    @Operation(summary = "Paseadores que el dueño del perro todavía no vio (su pila de swipe)")
    @GetMapping("/dogs/{dogId}/walkers")
    public List<Walker> paseadoresParaPerro(@PathVariable Long dogId) {
        try { return swipeService.paseadoresParaPerro(dogId); }
        catch (NoSuchElementException e) { throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage()); }
    }

    @Operation(summary = "Lista los matches guardados")
    @GetMapping("/matches")
    public List<DogMatch> matches() { return matches.findAll(); }

    public record SwipeRequest(Rol actor, Long actorId, Long objetivoId, String accion) {}

    @Operation(summary = "Swipe LIKE/PASS. actor=WALKER: objetivoId es un perro. actor=DOG: objetivoId es un paseador. Hay match si ambos se dan LIKE.")
    @PostMapping("/swipes")
    public Map<String, Object> swipe(@RequestBody SwipeRequest req) {
        if (req.actor() == null || req.actorId() == null || req.objetivoId() == null || req.accion() == null
                || !List.of("LIKE", "PASS").contains(req.accion().toUpperCase()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Faltan campos o accion no es LIKE/PASS");
        try {
            SwipeService.Resultado r = swipeService.swipe(req.actor(), req.actorId(), req.objetivoId(), req.accion());
            return Map.of("match", r.match(), "walker", r.walker(), "dog", r.dog());
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }
}
