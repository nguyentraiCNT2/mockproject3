package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductsRepository extends JpaRepository<ProductsEntity,Long> {
    Optional<ProductsEntity> findByProductsid(Long productsid);
    List<ProductsEntity> findByCore(String core);
    List<ProductsEntity> findByProductname(String productname);
    List<ProductsEntity> findByProductname(String productname, Pageable pageable);
    List<ProductsEntity> findByProductprice(String productprice, Pageable pageable);
    List<ProductsEntity> findByProductsview(String productsview, Pageable pageable);
    List<ProductsEntity> findByCategoryLV2id(CategoryLV2Entity categoryLV2, Pageable pageable);
    List<ProductsEntity> findByColorid(ColorEntity color, Pageable pageable);
    List<ProductsEntity> findByCategoryid(CategoryEntity categoryEntity, Pageable pageable);
    List<ProductsEntity> findAllByCategoryidOrderByProductpriceDesc(CategoryEntity categoryEntity, Pageable pageable);
    @Query("SELECT p FROM ProductsEntity p " +
            "WHERE (:color IS NULL OR p.colorid = :color) " +
            "AND (:category IS NULL OR p.categoryid = :category) " +
            "AND (:minPrice IS NULL OR p.productprice >= :minPrice) " +
            "AND (:maxPrice IS NULL OR p.productprice <= :maxPrice)")
    List<ProductsEntity> filterByColorAndPrice(@Param("category") CategoryEntity category,
                                               @Param("color") ColorEntity color,
                                               @Param("minPrice") BigDecimal minPrice,
                                               @Param("maxPrice") BigDecimal maxPrice,Pageable pageable );
    void deleteByProductsid(Long productsid);
    ProductsEntity saveAndFlush(ProductsEntity productsEntity);
}
