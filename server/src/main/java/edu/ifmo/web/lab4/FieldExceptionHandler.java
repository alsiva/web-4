package edu.ifmo.web.lab4;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class FieldExceptionHandler extends ResponseEntityExceptionHandler {

    // error handle for @Valid
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException ex,
        HttpHeaders headers,
        HttpStatus status,
        WebRequest request
    ) {
        Map<String, Object> body = new LinkedHashMap<>();

        //Get all errors
        List<FieldError> fieldErrors = ex.getBindingResult()
            .getFieldErrors();

        for (FieldError fieldError : fieldErrors) {
            body.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return new ResponseEntity<>(body, headers, status);
    }

}
