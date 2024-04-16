package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.ColorDTO;
import com.guardiannestshop.backend.entity.ColorEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
public class ColorMappper {
    private final ModelMapper modelMapper;

    public ColorMappper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }
    public ColorDTO maptoDTO (ColorEntity entity){
        ColorDTO dto = new ColorDTO();
        dto.setColorid(entity.getColorid());
        dto.setColorname(entity.getColorname());
        dto.setColorCore(entity.getColorCore());
        return dto;
    }
    public ColorEntity maptoEntity (ColorDTO dto){
        ColorEntity entity = new ColorEntity();
        entity.setColorid(dto.getColorid());
        entity.setColorname(dto.getColorname());
        entity.setColorCore(dto.getColorCore());
        return entity;
    }
}
