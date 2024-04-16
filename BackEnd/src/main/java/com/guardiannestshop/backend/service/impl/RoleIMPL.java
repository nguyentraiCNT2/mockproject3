package com.guardiannestshop.backend.service.impl;

import com.guardiannestshop.backend.Mapper.Opject.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.entity.*;
import com.guardiannestshop.backend.repository.*;
import com.guardiannestshop.backend.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleIMPL implements RoleSerVice {
    @Autowired
    private final RoleRepository roleRepository;
    private ModelMapper modelMapper;
    private RoleMapper roleMapper;

    public RoleIMPL(RoleRepository roleRepository, ModelMapper modelMapper, RoleMapper roleMapper) {
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.roleMapper = roleMapper;
    }

    @Override
    public List<RoleDTO> getAll(Pageable pageable) {
        List<RoleDTO> results = new ArrayList<>();
        List<RoleEntity> roleEntities = roleRepository.findAll(pageable).getContent();
        for (RoleEntity item: roleEntities
        ) {
            RoleDTO roleDTO = roleMapper.maptoDTO(item);
            results.add(roleDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) roleRepository.count();
    }

    @Override
    public RoleDTO getByRoleid(Long roleid) {
        try {
            RoleEntity role = roleRepository.findByRoleid(roleid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + roleid));
            return roleMapper.maptoDTO(role);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<RoleDTO> getByRolename(String rolename) {
        try {
            List<RoleEntity> role  = roleRepository.findByRolename(rolename);
            return role.stream()
                    .map(roleMapper::maptoDTO)
                    .collect(Collectors.toList());
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public void createRole(RoleDTO roleDTO) {
        if ( roleDTO != null) {
            RoleEntity role = roleMapper.maptoEntity(roleDTO);
            if (role != null) {
                roleRepository.save(role);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateRole(RoleDTO roleDTO) {
        RoleEntity existingRole  = roleRepository.findByRoleid(roleDTO.getRoleid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(roleDTO, existingRole);
        roleRepository.save(existingRole);
    }

    @Override
    public void deleteByRoleid(Long roleid) {
        roleRepository.deleteByRoleid(roleid);
    }
}
