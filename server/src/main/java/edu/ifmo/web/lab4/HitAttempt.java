package edu.ifmo.web.lab4;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import org.springframework.format.annotation.NumberFormat;

import javax.validation.constraints.*;


public class HitAttempt {
    private static final String MISSING_FIELD_MESSAGE = "value is missing";
    private static final String REGEX_DOUBLE = "^-?\\d+(\\.\\d+)?$";

    private static final String X_ERROR_MESSAGE = "x should be between -3 and 5";
    @Min(value = -3, message = X_ERROR_MESSAGE)
    @Max(value = 5, message = X_ERROR_MESSAGE)
    @NotNull(message = MISSING_FIELD_MESSAGE)
    private final Double x;

    @NotNull(message = MISSING_FIELD_MESSAGE)
    @Pattern(regexp = REGEX_DOUBLE, message = "must be a number")
    private final String y;

    @PositiveOrZero(message = "radius can't be negative")
    @NotNull(message = MISSING_FIELD_MESSAGE)
    private final Double r;

    public HitAttempt(Double x, String y, Double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return Double.parseDouble(y);
    }

    public double getR() {
        return r;
    }
    public boolean doesItHit() {
        return doesItHit(getX(), getY(), getR());
    }

    private static boolean doesItHit(double x, double y, double r) {
        if (-r <= x && x <= 0 && 0 <= y && y <= (x + r) / 2) {
            return true;
        }

        if (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2) && x >= 0 && y >= 0) {
            return true;
        }

        return 0 <= x && x <= r && -r / 2 <= y && y <= 0;
    }

}