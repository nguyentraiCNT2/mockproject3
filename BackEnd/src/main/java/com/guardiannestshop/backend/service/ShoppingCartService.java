package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ShoppingCartService {
    List<ShoppingCartDTO> getAll(Pageable pageable);
    int totalItem();
    ShoppingCartDTO getByCartid(Long cartid);
    List<ShoppingCartDTO> getByproductsid(Long productsid, Pageable pageable);
    List<ShoppingCartDTO> getByUserid(String userid, Pageable pageable);
    List<ShoppingCartDTO> getByStatus( String userid,Pageable pageable);
    void deleteCartByUserid(String userid);
    void deleteByCartid(Long cartid);
    void createShoppingCart(ShoppingCartDTO shoppingCartDTO);

    void updateShoppingCart(ShoppingCartDTO shoppingCartDTO);
}
