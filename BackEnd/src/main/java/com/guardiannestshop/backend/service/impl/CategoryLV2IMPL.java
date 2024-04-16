package com.guardiannestshop.backend.service.impl;

import com.guardiannestshop.backend.Mapper.Opject.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.entity.*;
import com.guardiannestshop.backend.repository.*;
import com.guardiannestshop.backend.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class CategoryLV2IMPL implements CategoryLV2Service {
    @Value("D:/GuardianNestShopcode/templates/public/images/") // Đường dẫn để lưu ảnh, có thể đặt trong file properties/application.yml
    private String imageSavePath;
    @Autowired
    private final CategoryLV2Repository categoryLV2Repository;
    private ModelMapper modelMapper;
    private CategoryLV2Mapper categoryLV2Mapper;

    public CategoryLV2IMPL(CategoryLV2Repository categoryLV2Repository, ModelMapper modelMapper, CategoryLV2Mapper categoryLV2Mapper) {
        this.categoryLV2Repository = categoryLV2Repository;
        this.modelMapper = modelMapper;
        this.categoryLV2Mapper = categoryLV2Mapper;
    }


    @Override
    public List<CategoryLV2DTO> getAll(Pageable pageable) {
        List<CategoryLV2DTO> results = new ArrayList<>();
        List<CategoryLV2Entity> categoryLV2Entities = categoryLV2Repository.findAll(pageable).getContent();
        for (CategoryLV2Entity item: categoryLV2Entities
        ) {
            CategoryLV2DTO DTO = categoryLV2Mapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) categoryLV2Repository.count();
    }

    @Override
    public CategoryLV2DTO findByCategorylvid(Long categorylvid) {
        try {
            CategoryLV2Entity categoryLV2 = categoryLV2Repository.findByCategorylvid(categorylvid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + categorylvid));
            return categoryLV2Mapper.maptoDTO(categoryLV2);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<CategoryLV2DTO> findByCategorylvname(String categorylvname,Pageable pageable) {
        List<CategoryLV2DTO> results = new ArrayList<>();
        List<CategoryLV2Entity> categoryLV2Entities = categoryLV2Repository.findByCategorylvname(categorylvname,pageable);
        for (CategoryLV2Entity item: categoryLV2Entities
        ) {
            CategoryLV2DTO DTO = categoryLV2Mapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public void deleteByCategorylvid(Long categorylvid) {
        categoryLV2Repository.deleteByCategorylvid(categorylvid);
    }

    @Override
    public void createCategorylvname(CategoryLV2DTO categoryLV2DTO) {
        if ( categoryLV2DTO != null) {
            CategoryLV2Entity categoryLV2 = categoryLV2Mapper.maptoEntity(categoryLV2DTO);
            if (categoryLV2 != null) {
                categoryLV2Repository.save(categoryLV2);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateCategorylvname(CategoryLV2DTO categoryLV2DTO) {
        CategoryLV2Entity existingCategorylv2  = categoryLV2Repository.findByCategorylvid(categoryLV2DTO.getCategorylvid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(categoryLV2DTO, existingCategorylv2);
        categoryLV2Repository.save(existingCategorylv2);
    }

    @Override
    public void uploadImage(Long categoryid, MultipartFile file) throws IOException {
        CategoryLV2Entity categoryLV2 = categoryLV2Repository.findByCategorylvid(categoryid).orElse(null);
        if (categoryLV2 != null) {
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            String filePath = imageSavePath + filename;
            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
            categoryLV2.setCategoryimageslogo(filename);
            categoryLV2Repository.save(categoryLV2);
        }
    }


}
