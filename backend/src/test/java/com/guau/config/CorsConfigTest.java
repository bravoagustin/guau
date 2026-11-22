package com.guau.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = "guau.cors.allowed-origins=https://bravoagustin.github.io")
class CorsConfigTest {

    @Autowired
    MockMvc mvc;

    @Test
    void origenPermitidoRecibeElHeaderCors() throws Exception {
        mvc.perform(get("/api/dogs").header("Origin", "https://bravoagustin.github.io"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "https://bravoagustin.github.io"));
    }

    @Test
    void origenNoListadoEsRechazado() throws Exception {
        mvc.perform(get("/api/dogs").header("Origin", "https://evil.example"))
                .andExpect(status().isForbidden());
    }

    @Test
    void preflightDeSwipeFuncionaDesdeElOrigenPermitido() throws Exception {
        mvc.perform(options("/api/swipes")
                        .header("Origin", "https://bravoagustin.github.io")
                        .header("Access-Control-Request-Method", "POST")
                        .header("Access-Control-Request-Headers", "content-type"))
                .andExpect(status().isOk())
                .andExpect(header().string("Access-Control-Allow-Origin", "https://bravoagustin.github.io"));
    }
}
