package com.fragile.infosafe.primary.config;

import com.fragile.infosafe.primary.model.Permission;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import static org.springframework.http.HttpMethod.GET;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;



// import static org.springframework.http.HttpMethod.*;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable) // csrf -> csrf.disable()
                .cors(cfg -> cfg.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/api/forgot/**").permitAll()
                        .requestMatchers(GET,"/api/user/getAll").hasAnyAuthority("user_create", "user_edit", "user_delete")
                        .requestMatchers(GET, "/api/datascope/getDs").hasAnyAuthority("data_scope_create", "data_scope_edit", "data_scope_delete")
                        .requestMatchers(GET, "/api/risk/getRisk").hasAnyAuthority("risks_create", "risks_edit", "risks_review", "risks_delete")
                        .requestMatchers(GET, "/api/task/getTask").hasAnyAuthority("tasks_create", "tasks_edit", "tasks_delete", "tasks_approve")
                        .requestMatchers(GET, "/api/accessrequest/getAr").hasAnyAuthority("access_requests_approve", "access_requests_edit")
                        .requestMatchers(GET, "/api/asset/getAsset").hasAnyAuthority("devices_create", "devices_edit", "devices_delete")
                        .requestMatchers(GET, "/api/assetrequest/getAr").hasAnyAuthority("asset_request_review")
                .anyRequest()
                .authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://infosafe.live", "http://localhost:3000", "https://infosafe.live")); //""
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}


