package com.guau.model;

import jakarta.persistence.*;

/** Un swipe: el actor (paseador o perro/dueño) elige LIKE o PASS sobre el otro lado. */
@Entity
@Table(name = "swipes")
public class Swipe {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Enumerated(EnumType.STRING)
    private Rol actorTipo;
    private Long actorId;
    private Long objetivoId;
    private boolean liked;

    public Swipe() {}
    public Swipe(Rol actorTipo, Long actorId, Long objetivoId, boolean like) {
        this.actorTipo = actorTipo; this.actorId = actorId; this.objetivoId = objetivoId; this.liked = like;
    }
    public boolean isLike() { return liked; }
    public void setLike(boolean like) { this.liked = like; }
    public Long getId() { return id; }
    public Rol getActorTipo() { return actorTipo; }
    public Long getActorId() { return actorId; }
    public Long getObjetivoId() { return objetivoId; }
}
