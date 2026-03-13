package com.app.urlshortener.service;

import com.app.urlshortener.dto.UrlRequest;
import com.app.urlshortener.entity.Url;
import com.app.urlshortener.entity.User;
import com.app.urlshortener.repository.UrlRepository;
import com.app.urlshortener.repository.UserRepository;
import com.app.urlshortener.util.Base62Encoder;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UrlService {

    private final UrlRepository urlRepository;
    private final UserRepository userRepository;

    public UrlService(UrlRepository urlRepository, UserRepository userRepository) {
        this.urlRepository = urlRepository;
        this.userRepository = userRepository;
    }

    public String createShortUrl(UrlRequest request, String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Url url = new Url();
        url.setOriginalUrl(request.getOriginalUrl());
        url.setClickCount(0);
        url.setUser(user);

        if (request.getCustomAlias() != null && !request.getCustomAlias().isBlank()){

            if (urlRepository.existsByCustomAlias(request.getCustomAlias())){
                throw new RuntimeException("Alias already taken");
            }

            url.setShortCode(request.getCustomAlias());
            urlRepository.save(url);

            return "http://localhost:8081/"+request.getCustomAlias();
        }

        Url savedUrl = urlRepository.save(url);

        String shortCode = Base62Encoder.encode(savedUrl.getId());

        savedUrl.setShortCode(shortCode);
        urlRepository.save(savedUrl);

        return "http://localhost:8081/"+shortCode;
    }

    @Cacheable(value = "urls", key = "#shortCode")
    public String getOriginalUrl(String shortCode){

        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found..!"));

        url.setClickCount(url.getClickCount()+1);
        urlRepository.save(url);

        return url.getOriginalUrl();
    }

    public Url getUrl(String shortCode){

        return urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found..!"));
    }

    public String getOriginalUrlAndIncreaseCount(String shortCode){

        Url url = urlRepository.findByShortCode(shortCode)
                .orElseThrow(() -> new RuntimeException("URL not found..!"));

        url.setClickCount(url.getClickCount()+1);
        urlRepository.save(url);

        return url.getOriginalUrl();
    }

    public List<Url> getUserLinks(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return urlRepository.findByUser(user);
    }

    public void deleteUrl(Long id){
        urlRepository.deleteById(id);
    }
}