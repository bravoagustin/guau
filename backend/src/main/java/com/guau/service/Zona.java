package com.guau.service;

import java.text.Normalizer;
import java.util.Map;

/**
 * Zonas a distancia de paseo a pie en Córdoba.
 * El paseador tiene que poder llegar caminando, así que no se cruzan zonas.
 */
public final class Zona {
    private Zona() {}

    private static final Map<String, String> BARRIO_A_ZONA = Map.of(
            "nueva cordoba", "Centro",
            "guemes", "Centro",
            "cofico", "Centro",
            "alta cordoba", "Centro",
            "cerro de las rosas", "Noroeste",
            "villa belgrano", "Noroeste"
    );

    public static String de(String barrio) {
        if (barrio == null || barrio.isBlank()) return null;
        return BARRIO_A_ZONA.get(normalizar(barrio));
    }

    public static boolean misma(String a, String b) {
        String za = de(a);
        String zb = de(b);
        return za != null && za.equals(zb);
    }

    private static String normalizar(String s) {
        String sinAcento = Normalizer.normalize(s, Normalizer.Form.NFD).replaceAll("\\p{M}", "");
        return sinAcento.toLowerCase().trim();
    }
}
