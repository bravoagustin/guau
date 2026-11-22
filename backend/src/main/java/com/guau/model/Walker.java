package com.guau.model;

import com.guau.service.Zona;
import jakarta.persistence.*;

@Entity
public class Walker {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int edad;
    private String barrio;
    @Column(length = 500)
    private String bio;
    private String experiencia;
    private String disponibilidad;
    private String fotoUrl;

    public Walker() {}
    public Walker(String nombre, int edad, String barrio, String bio, String experiencia, String disponibilidad, String fotoUrl) {
        this.nombre = nombre; this.edad = edad; this.barrio = barrio; this.bio = bio;
        this.experiencia = experiencia; this.disponibilidad = disponibilidad; this.fotoUrl = fotoUrl;
    }
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
    public String getBarrio() { return barrio; }
    public String getZona() { return Zona.de(barrio); }
    public String getBio() { return bio; }
    public String getExperiencia() { return experiencia; }
    public String getDisponibilidad() { return disponibilidad; }
    public String getFotoUrl() { return fotoUrl; }
}
