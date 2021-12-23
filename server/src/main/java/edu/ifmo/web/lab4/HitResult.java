package edu.ifmo.web.lab4;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class HitResult {
    @Id
    @GeneratedValue
    private Long id;

    private double x;
    private double y;
    private double r;
    private boolean doesHit;

    public HitResult(double x, double y, double r, boolean doesHit) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.doesHit = doesHit;
    }

    protected HitResult() {}

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public boolean isDoesHit() {
        return doesHit;
    }

    public Long getId() {
        return id;
    }
}