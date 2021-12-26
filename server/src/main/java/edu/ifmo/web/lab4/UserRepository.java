package edu.ifmo.web.lab4;
import org.springframework.data.jpa.repository.JpaRepository;

interface UserRepository extends JpaRepository<AppUser, Long> {
    AppUser findUserByName(String name);
}