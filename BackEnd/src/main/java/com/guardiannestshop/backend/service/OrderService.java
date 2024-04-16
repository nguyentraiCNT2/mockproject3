package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface OrderService  {
    List<OrderOTD> getAll(Pageable pageable);
    int totalItem();
   OrderOTD findByOrderid(Long orderid);
    OrderRequestDTO getByOrderid(Long orderid);
    List<OrderOTD> getByOrderstatus(String orderstatus, Pageable pageable);
    List<OrderOTD> getByOrderpay(String orderpay, Pageable pageable);
    List<OrderOTD> getByOrdercancel(String ordercancel, Pageable pageable);
    List<OrderOTD> getByUserid(String userid, Pageable pageable);
    List<OrderOTD> getByStatusUser(String userid, Pageable pageable);
 List<OrderOTD> getByStatusUser2(String userid, Pageable pageable);
 List<OrderOTD> getByStatusUser3(String userid, Pageable pageable);
    List<OrderOTD> getByOrderPayUser(String userid, Pageable pageable);
 List<OrderOTD> getByOrderPayUser2(String userid, Pageable pageable);
    List<OrderOTD> getByOrdercancelUser(String userid, Pageable pageable);
    List<OrderOTD> getByOrdercancelUser2(String userid, Pageable pageable);

    void placeOrder(OrderOTD order, List<OrderdetailsDTO> orderDetailsList);
    void approveOrders(OrderOTD order, List<OrderdetailsDTO> orderDetailsList);
    void deleteByOrderid(Long orderid);
    void createOrder(OrderOTD orderOTD);
    void updateOrder(OrderOTD orderOTD);
}
