package edu.ifmo.web.lab4;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
class HitController {
    private final HitRepository repository;

    HitController(HitRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/hits")
    List<HitResult> all() {
        return repository.findAll();
    }

    @PostMapping("/hits")
    HitResult addHit(@RequestBody @Valid HitAttempt hitAttempt) {
        HitResult hitResult = new HitResult(hitAttempt.getX(), hitAttempt.getY(), hitAttempt.getR(), hitAttempt.doesItHit());
        return repository.save(hitResult);
    }

    @DeleteMapping("/hits")
    void deleteAll() {
        repository.deleteAll();
    }
}