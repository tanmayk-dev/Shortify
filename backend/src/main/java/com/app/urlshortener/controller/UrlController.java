package com.app.urlshortener.controller;

import com.app.urlshortener.dto.UrlRequest;
import com.app.urlshortener.entity.Url;
import com.app.urlshortener.service.UrlService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/url")
public class UrlController {

    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @Operation(summary = "Create short URL")
    @PostMapping("/shorten")
    public ResponseEntity<?> shortenUrl(
            @Valid @RequestBody UrlRequest request,
            Authentication authentication){

        String email = authentication.getName();

        String shortUrl = urlService.createShortUrl(request, email);

        return ResponseEntity.ok(shortUrl);
    }

    @GetMapping("/analytics/{shortCode}")
    public ResponseEntity<?> getAnalytics(@PathVariable String shortCode){
        Url url = urlService.getUrl(shortCode);
        return ResponseEntity.ok(url);
    }

    @GetMapping("/my-links")
    public ResponseEntity<?> getMyLinks(Authentication authentication){

        if(authentication == null){
            return ResponseEntity.status(401).body("Not authenticated");
        }

        String email = authentication.getName();

        return ResponseEntity.ok(
                urlService.getUserLinks(email)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLink(@PathVariable Long id){

        urlService.deleteUrl(id);

        return ResponseEntity.ok("Deleted");
    }
}
