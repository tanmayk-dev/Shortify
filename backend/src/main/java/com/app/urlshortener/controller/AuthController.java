package com.app.urlshortener.controller;

import com.app.urlshortener.dto.LoginRequest;
import com.app.urlshortener.dto.RegisterRequest;
import com.app.urlshortener.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) throws Exception {

        authService.registerUser(request);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){

      String token = authService.loginUser(request);
      return ResponseEntity.ok(token);

    }


}
