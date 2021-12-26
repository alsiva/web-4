package edu.ifmo.web.lab4;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class AppUser {
    @Id
    @GeneratedValue
    private Long Id;

    private String name;
    private String password;

    public AppUser(String name, String password) {
        this.name = name;
        this.password = password;
    }

    protected AppUser() {}

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}