package edu.ifmo.web.lab4;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;

@RestController
class UserController {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    UserController(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/users")
    void addUser(@RequestBody @Valid UserAttempt userAttempt) {
        User alreadyExistingUser = repository.findUserByName(userAttempt.getName());
        if (alreadyExistingUser != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User " + userAttempt.getName() + " already exists");
        }

        User user = new User(userAttempt.getName().trim(), passwordEncoder.encode(userAttempt.getPassword().trim()));
        repository.save(user);
    }
}