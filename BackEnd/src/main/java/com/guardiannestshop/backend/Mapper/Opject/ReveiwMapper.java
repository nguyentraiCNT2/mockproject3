package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.ReviewDTO;
import com.guardiannestshop.backend.entity.ReviewEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ReveiwMapper {
    private final ModelMapper modelMapper;

    public ReveiwMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ReviewDTO maptoDTO (ReviewEntity entity){
        ReviewDTO dto = new ReviewDTO();
        dto.setReviewid(entity.getReviewid());
        dto.setContents(entity.getContents());
        dto.setEvaluate(entity.getEvaluate());
        dto.setStatus(entity.isStatus());
        dto.setUserid(entity.getUserid().getUserid());
        dto.setProductsid(entity.getProductsid().getProductsid());
        return dto;
    }

    public ReviewEntity maptoEntity (ReviewDTO dto){
        ReviewEntity entity = new ReviewEntity();
        entity.setReviewid(dto.getReviewid());
        entity.setContents(dto.getContents());
        entity.setEvaluate(dto.getEvaluate());
        entity.setStatus(dto.isStatus());
        return entity;
    }
}
