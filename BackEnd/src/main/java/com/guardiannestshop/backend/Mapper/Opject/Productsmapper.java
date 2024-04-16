package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.ProductsDTO;
import com.guardiannestshop.backend.entity.ProductsEntity;
import org.modelmapper.ModelMapper;

public class Productsmapper {
    private final ModelMapper modelMapper;

    public Productsmapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ProductsDTO maptoDTO (ProductsEntity entity){
        ProductsDTO dto = new ProductsDTO();
        dto.setProductsid(entity.getProductsid());
        dto.setProductcore(entity.getCore());
        dto.setProductsstatus(entity.getProductsstatus());
        dto.setProductname(entity.getProductname());
        dto.setProductsdescribe(entity.getProductsdescribe());
        dto.setProductsview(entity.getProductsview());
        dto.setProductsqltk(entity.getProductsqltk());
        dto.setProductprice(entity.getProductprice());
        dto.setColorid(entity.getColorid() != null ? entity.getColorid().getColorid() : null );
        dto.setCategoryid(entity.getCategoryid() != null ? entity.getCategoryid().getCategoryid() : null);
        dto.setCategoryLV2id(entity.getCategoryLV2id() != null ? entity.getCategoryLV2id().getCategorylvid() : null);
        dto.setImagesmain(entity.getImagesmain());
        dto.setImages2(entity.getImages2());
        dto.setImages3(entity.getImages3());
        dto.setImages4(entity.getImages4());
        dto.setImages5(entity.getImages5());
        return dto;
    }

    public ProductsEntity maptoEntity (ProductsDTO dto){
        ProductsEntity entity = new ProductsEntity();
        entity.setProductsid(dto.getProductsid());
        entity.setCore(dto.getProductcore());
        entity.setProductsstatus(dto.isProductsstatus());
        entity.setProductname(dto.getProductname());
        entity.setProductsview(dto.getProductsview());
        entity.setProductsqltk(dto.getProductsqltk());
        entity.setProductprice(dto.getProductprice());
        entity.setProductsdescribe(dto.getProductsdescribe());
        entity.setImagesmain(dto.getImagesmain());
        entity.setImages2(dto.getImages2());
        entity.setImages3(dto.getImages3());
        entity.setImages4(dto.getImages4());
        entity.setImages5(dto.getImages5());
        return entity;
    }
}
