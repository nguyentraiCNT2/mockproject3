package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.OrderEntity;
import com.guardiannestshop.backend.entity.OrderdetailsEntity;
import com.guardiannestshop.backend.entity.ProductsEntity;
import com.guardiannestshop.backend.entity.ShipEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderdetailsRepository extends JpaRepository<OrderdetailsEntity, Long> {
    Optional<OrderdetailsEntity> findByOrderdetailid(Long orderdetailid);

    List<OrderdetailsEntity> findByProductsid(ProductsEntity products, Pageable pageable);
    List<OrderdetailsEntity> findByShipid(ShipEntity ship, Pageable pageable);
    List<OrderdetailsEntity> findByOrderid(OrderEntity order, Pageable pageable);
    List<OrderdetailsEntity> findByOrderid(OrderEntity order);
    void deleteByOrderdetailid(Long orderdetailid);
    OrderdetailsEntity saveAndFlush(OrderdetailsEntity orderdetailsEntity);
}
