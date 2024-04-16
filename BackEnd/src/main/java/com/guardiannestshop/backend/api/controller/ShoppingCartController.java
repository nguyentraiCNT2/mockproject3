package com.guardiannestshop.backend.api.controller;

import com.guardiannestshop.backend.api.output.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/shopping-cart/api")
public class ShoppingCartController {
    @Autowired
    private ShoppingCartService shoppingCartService;

    @GetMapping("/get-all")
    public ShoppingcartOutput getAll(@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ShoppingcartOutput result = new ShoppingcartOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(shoppingCartService.getAll(pageable));
        result.setTotalPage((int) Math.ceil((double) (shoppingCartService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/get-by-status/{userid}")
    public ShoppingcartOutput getByStatus(@PathVariable String userid ,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
       try {
           ShoppingcartOutput result = new ShoppingcartOutput();
           result.setPage(page);
           Pageable pageable =  PageRequest.of(page - 1, limit);
           result.setListResult(shoppingCartService.getByStatus(userid,pageable));
           result.setTotalPage((int) Math.ceil((double) (shoppingCartService.totalItem()) / limit));
           model.addAttribute("ShoppingcartOutput", result);
           return result;
       }catch (Exception e){
           e.printStackTrace();
           return null;
       }

    }
    @GetMapping("/get-by-user-id/{userid}")
    public ShoppingcartOutput getByUserid(@PathVariable String userid,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ShoppingcartOutput result = new ShoppingcartOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(shoppingCartService.getByUserid(userid,pageable));
        result.setTotalPage((int) Math.ceil((double) (shoppingCartService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @PostMapping("/create-shopping-cart")
    public ResponseEntity<String> createShoppingcart(@RequestBody ShoppingCartDTO shoppingCartDTO) {
        try {
            shoppingCartDTO.setStatus(false);
            shoppingCartService.createShoppingCart(shoppingCartDTO);
            return new ResponseEntity<>("more success ", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/update-shopping-cart/{cartid}")
    public ResponseEntity<String> updateShoppingCart(@PathVariable Long cartid, @RequestBody ShoppingCartDTO shoppingCartDTO) {
        try {
            shoppingCartDTO.setCartid(cartid);
            shoppingCartService.updateShoppingCart(shoppingCartDTO);
            return new ResponseEntity<>(shoppingCartDTO+"Cập nhật quyền người dùng thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // xóa dữ liệu
    @Transactional
    @DeleteMapping("/delete-shopping-cart/{cartid}")
    public ResponseEntity<String> deleteByCartid(@PathVariable  Long cartid) {
        try {
            shoppingCartService.deleteByCartid(cartid);
            return new ResponseEntity<>("Xóa Ảnh thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional
    @DeleteMapping("/delete-shopping-cart-by-userid/{userid}")
    public ResponseEntity<String> deleteByUserid(@PathVariable  String  userid) {
        try {
            shoppingCartService.deleteCartByUserid(userid);
            return new ResponseEntity<>("Xóa  thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
