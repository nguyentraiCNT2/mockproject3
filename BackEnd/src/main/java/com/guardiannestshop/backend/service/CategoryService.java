package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService{
    List<CategoryDTO> getAll(Pageable pageable);
    int totalItem();
   CategoryDTO getByCategoryid(Long categoryid);
    List<CategoryDTO> getByCategoryname(String categoryname,Pageable pageable);
    void deleteByCategoryid(Long categoryid);
    void createCategory(CategoryDTO categoryDTO);
    void updateCategory(CategoryDTO categoryDTO);

}
