package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.RoleEntity;
import com.guardiannestshop.backend.entity.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByUserid(String userid);
    List<UserEntity> findByUsername(String username, Pageable pageable);
    List<UserEntity> findByUsername(String username);
    List<UserEntity> findByEmail(String email);
    List<UserEntity> findByStatus(Boolean status);
    List<UserEntity> findByRoleid(RoleEntity roleEntity, Pageable pageable);
    void deleteByUserid(String userid);
    UserEntity saveAndFlush(UserEntity userEntity);

}
