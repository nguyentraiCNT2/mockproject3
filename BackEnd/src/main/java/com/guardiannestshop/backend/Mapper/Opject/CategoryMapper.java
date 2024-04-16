package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.CategoryDTO;
import com.guardiannestshop.backend.entity.CategoryEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
public class CategoryMapper {
    private final ModelMapper modelMapper;

    public CategoryMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CategoryDTO maptoDTO (CategoryEntity entity){
        CategoryDTO dto = new CategoryDTO();
        dto.setCategoryid(entity.getCategoryid());
        dto.setCategoryname(entity.getCategoryname());
        return dto;
    }
    public CategoryEntity maptoEntity (CategoryDTO dto){
        CategoryEntity entity = new CategoryEntity();
        entity.setCategoryid(dto.getCategoryid());
        entity.setCategoryname(dto.getCategoryname());
        return entity;
    }
}
