package com.guau;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class GuauApplication {
    public static void main(String[] args) {
        SpringApplication.run(GuauApplication.class, args);
    }
}
