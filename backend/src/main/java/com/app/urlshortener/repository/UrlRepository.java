package com.app.urlshortener.repository;

import com.app.urlshortener.entity.Url;
import com.app.urlshortener.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url, Long> {

    Optional<Url> findByShortCode(String shortCode);
    Optional<Url> findByCustomAlias(String alias);

    boolean existsByCustomAlias(String alias);

    List<Url> findByUser(User user);
}
