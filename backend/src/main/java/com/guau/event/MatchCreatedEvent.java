package com.guau.event;

public record MatchCreatedEvent(Long walkerId, String walkerNombre, Long dogId, String dogNombre) {}
