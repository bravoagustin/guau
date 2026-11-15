package com.guau.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "matches")
public class DogMatch {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long walkerId;
    private String walkerNombre;
    private Long dogId;
    private String dogNombre;
    private Instant creadoEn = Instant.now();

    public DogMatch() {}
    public DogMatch(Long walkerId, String walkerNombre, Long dogId, String dogNombre) {
        this.walkerId = walkerId; this.walkerNombre = walkerNombre; this.dogId = dogId; this.dogNombre = dogNombre;
    }
    public Long getId() { return id; }
    public Long getWalkerId() { return walkerId; }
    public String getWalkerNombre() { return walkerNombre; }
    public Long getDogId() { return dogId; }
    public String getDogNombre() { return dogNombre; }
    public Instant getCreadoEn() { return creadoEn; }
}
