package edu.ifmo.web.lab4;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue
    private Long Id;

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
}