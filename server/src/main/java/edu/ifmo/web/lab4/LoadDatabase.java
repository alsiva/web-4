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
    CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String username = "alex";

            User user = userRepository.findUserByName(username);
            if (user == null) {
                String encodedPassword = passwordEncoder.encode("alex");
                log.info("Preloading " + userRepository.save(new User(username, encodedPassword)));
            } else {
                log.info("User " + username + " already exists");
            }
        };
    }
}