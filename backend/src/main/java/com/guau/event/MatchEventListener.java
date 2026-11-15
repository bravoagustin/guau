package com.guau.event;

import com.guau.model.DogMatch;
import com.guau.repo.MatchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class MatchEventListener {
    private static final Logger log = LoggerFactory.getLogger(MatchEventListener.class);
    private final MatchRepository matches;

    public MatchEventListener(MatchRepository matches) { this.matches = matches; }

    @Async
    @EventListener
    public void onMatch(MatchCreatedEvent e) {
        matches.save(new DogMatch(e.walkerId(), e.walkerNombre(), e.dogId(), e.dogNombre()));
        log.info("🐾 [EVENTO] Match guardado: paseador {} + perro {}. Avisando a ambos por WhatsApp... (simulado)",
                e.walkerNombre(), e.dogNombre());
    }
}
