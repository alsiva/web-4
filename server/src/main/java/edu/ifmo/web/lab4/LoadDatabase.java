package edu.ifmo.web.lab4;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(HitRepository hitRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            log.info("Preloading " + userRepository.save(new User("alex", passwordEncoder.encode("alex"))));

            log.info("Preloading " + hitRepository.save(new HitResult(0, 0, 1, true)));
        };
    }
}