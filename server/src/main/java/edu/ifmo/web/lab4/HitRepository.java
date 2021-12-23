package edu.ifmo.web.lab4;
import org.springframework.data.jpa.repository.JpaRepository;

interface HitRepository extends JpaRepository<HitResult, Long> {}