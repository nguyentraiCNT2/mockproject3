package com.guardiannestshop.backend.repository;

import com.guardiannestshop.backend.entity.CategoryEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {
    Optional<CategoryEntity> findByCategoryid(Long categoryid);
    List<CategoryEntity> findByCategoryname(String categoryname, Pageable pageable);
    void deleteByCategoryid(Long categoryid);
    CategoryEntity saveAndFlush(CategoryEntity categoryEntity);
}
