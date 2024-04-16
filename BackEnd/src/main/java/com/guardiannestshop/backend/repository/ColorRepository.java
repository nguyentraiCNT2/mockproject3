package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.ColorEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ColorRepository extends JpaRepository<ColorEntity,Long> {
    Optional<ColorEntity> findByColorid(Long colorid);
    List<ColorEntity> findByColorname(String colorname, Pageable pageable);
    void deleteByColorid(Long colorid);
    ColorEntity saveAndFlush(ColorEntity colorEntity);
}
