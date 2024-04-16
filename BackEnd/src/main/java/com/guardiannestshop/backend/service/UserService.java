package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    List<UserDTO> getAll(Pageable pageable);
    int totalItem();
    UserDTO getByUserid(String userid);
    List<UserDTO> getByUsername(String username,Pageable pageable);
    List<UserDTO> getByEmail(String email);
    List<UserDTO> getByRoleid(Long roleid,Pageable pageable);
    void deleteByUserid(String userid);
    void createUser(UserDTO userDTO);

    void updateUser(UserDTO userDTO);
    void uploadImage(String userid, MultipartFile file) throws IOException;
}
