package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecurityRepository extends JpaRepository<UserEntity, String> {
    List<UserEntity> findByUsername(String username);
}
