package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.ShoppingCartEntity;
import com.guardiannestshop.backend.entity.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCartEntity,Long> {
    Optional<ShoppingCartEntity> findByCartid(Long cartid);
    List<ShoppingCartEntity> findByProductsid(Long productsid, Pageable pageable);
    List<ShoppingCartEntity> findByUserid(UserEntity userid, Pageable pageable);
    List<ShoppingCartEntity> findByUserid(UserEntity userid);
    List<ShoppingCartEntity> findByStatus(Boolean status, Pageable pageable);
    void deleteByCartid(Long cartid);
    ShoppingCartEntity saveAndFlush(ShoppingCartEntity shoppingCartEntity);
}
