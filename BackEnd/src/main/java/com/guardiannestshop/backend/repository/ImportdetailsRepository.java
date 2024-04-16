package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.ImportdetailsEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ImportdetailsRepository extends JpaRepository<ImportdetailsEntity,Long> {
    Optional<ImportdetailsEntity> findByImportdetailsid(Long importdetailsid);
    List<ImportdetailsEntity> findByProductsid(Long productsid, Pageable pageable);
    void deleteByImportdetailsid(Long importdetailsid);
    ImportdetailsEntity saveAndFlush(ImportdetailsEntity importdetailsEntity);
}
