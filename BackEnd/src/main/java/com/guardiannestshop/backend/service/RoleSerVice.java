package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RoleSerVice {
    List<RoleDTO> getAll(Pageable pageable);
    int totalItem();
    RoleDTO getByRoleid(Long roleid);
    List<RoleDTO> getByRolename(String rolename);
    void createRole(RoleDTO roleDTO);

    void updateRole(RoleDTO roleDTO);
    void deleteByRoleid(Long roleid);

}
