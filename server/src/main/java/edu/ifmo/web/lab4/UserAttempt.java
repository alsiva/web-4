package edu.ifmo.web.lab4;

import javax.validation.constraints.NotBlank;


public class UserAttempt {
    private static final String FIELD_BLANK_MESSAGE = "is blank";

    @NotBlank(message = FIELD_BLANK_MESSAGE)
    private final String name;
    @NotBlank(message = FIELD_BLANK_MESSAGE)
    private final String password;

    public UserAttempt(String name, String password) {
        this.name = name;
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }
}