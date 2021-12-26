package edu.ifmo.web.lab4;
import org.springframework.data.jpa.repository.JpaRepository;

interface UserRepository extends JpaRepository<User, Long> {
    User findUserByName(String name);
}