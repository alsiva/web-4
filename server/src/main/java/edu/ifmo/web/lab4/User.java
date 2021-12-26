package edu.ifmo.web.lab4;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "LAB_USER")
public class User {
    @Id
    @GeneratedValue
    private Long Id;

    @Column(unique=true)
    private String name;
    private String password;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }

    protected User() {}

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String toString() {
        return "User " + name;
    }
}