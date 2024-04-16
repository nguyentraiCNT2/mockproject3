package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserAddressService {
    List<UserAddressDTO> getAll(Pageable pageable);
    int totalItem();
    UserAddressDTO getByUseraddressid(Long useraddressid);
    List<UserAddressDTO> getByUseraddress(String useraddress, Pageable pageable);
    List<UserAddressDTO> getByUserid(String userid, Pageable pageable);

    List<UserAddressDTO> getByUseridIfStatus(String userid, Pageable pageable);
    void deleteByUseraddressid(Long useraddressid);

    void createUserAddress(UserAddressDTO userAddressDTO);

    void updateUserAdress(UserAddressDTO userAddressDTO);
}
