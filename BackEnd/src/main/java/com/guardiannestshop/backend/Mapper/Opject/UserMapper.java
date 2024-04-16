package com.guardiannestshop.backend.Mapper.Opject;

import com.guardiannestshop.backend.dto.UserDTO;
import com.guardiannestshop.backend.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
@Component
public class UserMapper {
    private final ModelMapper modelMapper;


    public UserMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

public UserDTO maptoDTO (UserEntity entity){
        UserDTO dto = new UserDTO();
        dto.setMkc2(entity.getMkc2());
    dto.setUserid(entity.getUserid());
    dto.setRoleid(entity.getRoleid().getRoleid());
    dto.setUsername(entity.getUsername());
    dto.setPassword(entity.getPassword());
    dto.setPhone(entity.getPhone());
    dto.setEmail(entity.getEmail());
    dto.setFirtname(entity.getFirtname());
    dto.setLastname(entity.getLastname());
    dto.setImages(entity.getImages());
    dto.setGender(entity.getGender());
    dto.setStatus(entity.isStatus());
    return dto;
}

    public UserEntity maptoEntity (UserDTO dto){
        UserEntity entity = new UserEntity();
        entity.setUserid(dto.getUserid());
        entity.setMkc2(dto.getMkc2());
        entity.setUsername(dto.getUsername());
        entity.setPassword(dto.getPassword());
        entity.setPhone(dto.getPhone());
        entity.setEmail(dto.getEmail());
        entity.setFirtname(dto.getFirtname());
        entity.setLastname(dto.getLastname());
        entity.setImages(dto.getImages());
        entity.setGender(dto.getGender());
        entity.setStatus(dto.isStatus());
        return entity;
    }
}
