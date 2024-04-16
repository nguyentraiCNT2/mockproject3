package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.OrderOTD;
import com.guardiannestshop.backend.entity.OrderEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {
    private final ModelMapper modelMapper;

    public OrderMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public OrderOTD maptoDTO (OrderEntity entity){
        OrderOTD dto = new OrderOTD();
        dto.setOrderid(entity.getOrderid());
        dto.setUserid(entity.getUserid() != null ? entity.getUserid().getUserid() : null);
        dto.setDeliverydate(entity.getDeliverydate());
        dto.setOrdercancel(entity.getOrdercancel());
        dto.setOrderdate(entity.getOrderdate());
        dto.setOrderstatus(entity.getOrderstatus());
        dto.setOrderpay(entity.getOrderpay());
        dto.setAddress(entity.getAddress());
        return dto;
    }
    public OrderEntity maptoEntity (OrderOTD dto){
        OrderEntity entity = new OrderEntity();
        entity.setOrderid(dto.getOrderid());
        entity.setDeliverydate(dto.getDeliverydate());
        entity.setOrdercancel(dto.getOrdercancel());
        entity.setOrderdate(dto.getOrderdate());
        entity.setOrderstatus(dto.getOrderstatus());
        entity.setOrderpay(dto.getOrderpay());
        entity.setAddress(dto.getAddress());
        return entity;
    }
}
