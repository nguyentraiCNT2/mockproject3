package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface OrderdetailsService {
  List<OrderdetailsDTO> getAll(Pageable pageable);
  int totalItem();
  OrderdetailsDTO getByOrderdetailid(Long orderdetailid);

    List<OrderdetailsDTO> getByProductsid(Long productsid, Pageable pageable);
    List<OrderdetailsDTO> getByShipid(Long shipid, Pageable pageable);
  List<OrderdetailsDTO> getByOrderid(Long orderid, Pageable pageable);
    void deleteByOrderdetailid(Long orderdetailid);
    void createOrderdetails(OrderdetailsDTO orderdetailsDTO);
    void updateOrderdetails(OrderdetailsDTO orderdetailsDTO);
}
