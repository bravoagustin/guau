package com.guau.model;

import com.guau.service.Zona;
import jakarta.persistence.*;

@Entity
public class Dog {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private int edad;
    private String raza;
    private String barrio;
    @Column(length = 500)
    private String bio;
    private String energia;
    private String fotoUrl;
    private String duenoNombre;

    public Dog() {}
    public Dog(String nombre, int edad, String raza, String barrio, String bio, String energia, String fotoUrl, String duenoNombre) {
        this.nombre = nombre; this.edad = edad; this.raza = raza; this.barrio = barrio;
        this.bio = bio; this.energia = energia; this.fotoUrl = fotoUrl; this.duenoNombre = duenoNombre;
    }
    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public int getEdad() { return edad; }
    public String getRaza() { return raza; }
    public String getBarrio() { return barrio; }
    public String getZona() { return Zona.de(barrio); }
    public String getBio() { return bio; }
    public String getEnergia() { return energia; }
    public String getFotoUrl() { return fotoUrl; }
    public String getDuenoNombre() { return duenoNombre; }
}
