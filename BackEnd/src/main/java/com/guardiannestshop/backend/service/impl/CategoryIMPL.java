package com.guardiannestshop.backend.service.impl;

import com.guardiannestshop.backend.Mapper.Opject.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.entity.*;
import com.guardiannestshop.backend.repository.*;
import com.guardiannestshop.backend.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryIMPL implements CategoryService {
    @Autowired
    private final CategoryRepository categoryRepository;
    private ModelMapper modelMapper;
    private CategoryMapper categoryMapper;

    public CategoryIMPL(CategoryRepository categoryRepository, ModelMapper modelMapper, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDTO> getAll(Pageable pageable) {
        List<CategoryDTO> results = new ArrayList<>();
        List<CategoryEntity> categoryEntities = categoryRepository.findAll(pageable).getContent();
        for (CategoryEntity item: categoryEntities
        ) {
            CategoryDTO DTO = categoryMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) categoryRepository.count();
    }

    @Override
    public CategoryDTO getByCategoryid(Long categoryid) {
        try {
            CategoryEntity category = categoryRepository.findByCategoryid(categoryid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + categoryid));
            return categoryMapper.maptoDTO(category);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<CategoryDTO> getByCategoryname(String categoryname,Pageable pageable) {
        List<CategoryDTO> results = new ArrayList<>();
        List<CategoryEntity> categoryEntities = categoryRepository.findByCategoryname(categoryname,pageable);
        for (CategoryEntity item: categoryEntities
        ) {
            CategoryDTO DTO = categoryMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public void deleteByCategoryid(Long categoryid) {
        categoryRepository.deleteByCategoryid(categoryid);
    }

    @Override
    public void createCategory(CategoryDTO categoryDTO) {
        if ( categoryDTO != null) {
            CategoryEntity category = categoryMapper.maptoEntity(categoryDTO);
            if (category != null) {
                categoryRepository.save(category);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateCategory(CategoryDTO categoryDTO) {
        CategoryEntity existingCategory  = categoryRepository.findByCategoryid(categoryDTO.getCategoryid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(categoryDTO, existingCategory);
        categoryRepository.save(existingCategory);
    }
}
