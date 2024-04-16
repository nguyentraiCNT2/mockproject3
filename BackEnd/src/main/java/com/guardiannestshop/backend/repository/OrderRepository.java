package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.OrderEntity;
import com.guardiannestshop.backend.entity.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderEntity,Long> {
    Optional<OrderEntity> findByOrderid(Long orderid);
    List<OrderEntity> findByOrderstatus(String orderstatus, Pageable pageable);
    List<OrderEntity> findByOrderpay(String orderpay, Pageable pageable);
    List<OrderEntity> findByOrdercancel(String ordercancel, Pageable pageable);
    List<OrderEntity> findByUserid(UserEntity userid, Pageable pageable);
    void deleteByOrderid(Long orderid);
    OrderEntity saveAndFlush(OrderEntity orderEntity);
}
