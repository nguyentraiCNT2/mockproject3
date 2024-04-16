package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomersService {
 List<CustomersDTO> getAll(Pageable pageable);
 int totalItem();
   CustomersDTO getByCustomerid(String customerid);
    List<CustomersDTO> getByCustomername(String customername, Pageable pageable);
    List<CustomersDTO> getByEmail(String email, Pageable pageable);
    List<CustomersDTO> getByRoleid(Long roleid, Pageable pageable);
    void deleteByCustomerid(String customerid);
    void createCustomers(CustomersDTO customersDTO);
    void updateCustomers(CustomersDTO customersDTO);
}
