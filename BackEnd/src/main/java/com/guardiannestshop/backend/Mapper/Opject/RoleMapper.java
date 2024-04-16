package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.RoleDTO;
import com.guardiannestshop.backend.entity.RoleEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
@Component
public class RoleMapper {
    private final ModelMapper modelMapper;


    public RoleMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public RoleDTO maptoDTO (RoleEntity entity){
        RoleDTO dto = new RoleDTO();
        dto.setRoleid(entity.getRoleid());
        dto.setRolename(entity.getRolename());
        dto.setStatus(entity.isStatus());
        return dto;
    }

    public RoleEntity maptoEntity (RoleDTO dto){
        RoleEntity entity = new RoleEntity();
        entity.setRoleid(dto.getRoleid());
        entity.setRolename(dto.getRolename());
        entity.setStatus(dto.isStatus());
        return entity;
    }
}
