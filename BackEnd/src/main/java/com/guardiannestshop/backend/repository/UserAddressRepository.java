package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.UserAddressEntity;
import com.guardiannestshop.backend.entity.UserEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddressEntity, Long> {
    Optional<UserAddressEntity> findByUseraddressid(Long useraddressid);
    List<UserAddressEntity> findByUseraddress(String useraddress, Pageable pageable);
    List<UserAddressEntity> findByUserid(UserEntity userid, Pageable pageable);
    List<UserAddressEntity> findByUserid(UserEntity userid);
    void deleteByUseraddressid(Long useraddressid);
    UserAddressEntity saveAndFlush(UserAddressEntity userAddressEntity);
}
