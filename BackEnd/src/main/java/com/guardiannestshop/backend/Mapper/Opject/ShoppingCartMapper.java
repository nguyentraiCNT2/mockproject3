package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.ShoppingCartDTO;
import com.guardiannestshop.backend.entity.ShoppingCartEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class ShoppingCartMapper {
    private final ModelMapper modelMapper;

    public ShoppingCartMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ShoppingCartDTO maptoDTO (ShoppingCartEntity entity){
        ShoppingCartDTO dto = new ShoppingCartDTO();
        dto.setCartid(entity.getCartid());
        dto.setDateadd(entity.getDateadd());
        dto.setQty(entity.getQty());
        dto.setStatus(entity.getStatus());
        dto.setUserid(entity.getUserid().getUserid());
        dto.setProductsid(entity.getProductsid().getProductsid());
        return dto;
    }

    public ShoppingCartEntity maptoEntity (ShoppingCartDTO dto){
        ShoppingCartEntity entity = new ShoppingCartEntity();
        entity.setCartid(dto.getCartid());
        entity.setDateadd(dto.getDateadd());
        entity.setQty(dto.getQty());
        entity.setStatus(dto.getStatus());
        return entity;
    }
}
