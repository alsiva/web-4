package edu.ifmo.web.lab4;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;


@Configuration
@EnableConfigurationProperties
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    private final DbUserDetailsService dbUserDetailsService;

    public SecurityConfiguration(DbUserDetailsService dbUserDetailsService) {
        this.dbUserDetailsService = dbUserDetailsService;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/", "/index.html", "/static/**").permitAll()
            .anyRequest().authenticated()
            .and().httpBasic()
            .and().sessionManagement().disable();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder builder) throws Exception {
        builder.userDetailsService(dbUserDetailsService);
    }

}
