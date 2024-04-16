package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.ShipDTO;
import com.guardiannestshop.backend.entity.ShipEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class Shipmapper {
    private final ModelMapper modelMapper;

    public Shipmapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public ShipDTO maptoDTO (ShipEntity entity){
        ShipDTO dto = new ShipDTO();
        dto.setShipid(entity.getShipid());
        dto.setShipdate(entity.getShipdate());
        dto.setStatus(entity.isStatus());
        dto.setShipname(entity.getShipname());
        dto.setShipprice(entity.getShipprice());
        return dto;
    }

    public ShipEntity maptoEntity (ShipDTO dto){
        ShipEntity entity = new ShipEntity();
        entity.setShipid(dto.getShipid());
        entity.setShipdate(dto.getShipdate());
        entity.setStatus(dto.isStatus());
        entity.setShipname(dto.getShipname());
        entity.setShipprice(dto.getShipprice());
        return entity;
    }
}
