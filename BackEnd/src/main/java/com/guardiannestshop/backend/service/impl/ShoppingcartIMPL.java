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

@Service
public class ShoppingcartIMPL implements ShoppingCartService {
    @Autowired
    private final ShoppingCartRepository shoppingCartRepository;
    private ModelMapper modelMapper;
    private ShoppingCartMapper shoppingCartMapper;
    private ProductsRepository productsRepository;
    private UserRepository userRepository;


    public ShoppingcartIMPL(ShoppingCartRepository shoppingCartRepository, ModelMapper modelMapper, ShoppingCartMapper shoppingCartMapper, ProductsRepository productsRepository, UserRepository userRepository) {
        this.shoppingCartRepository = shoppingCartRepository;
        this.modelMapper = modelMapper;
        this.shoppingCartMapper = shoppingCartMapper;
        this.productsRepository = productsRepository;
        this.userRepository = userRepository;
    }


    @Override
    public List<ShoppingCartDTO> getAll(Pageable pageable) {
        List<ShoppingCartDTO> results = new ArrayList<>();
        List<ShoppingCartEntity> shoppingCartEntities = shoppingCartRepository.findAll(pageable).getContent();
        for (ShoppingCartEntity item: shoppingCartEntities
        ) {
            ShoppingCartDTO shoppingCartDTO = shoppingCartMapper.maptoDTO(item);
            results.add(shoppingCartDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) shoppingCartRepository.count();
    }

    @Override
    public ShoppingCartDTO getByCartid(Long cartid) {
        try {
            ShoppingCartEntity shoppingcart = shoppingCartRepository.findByCartid(cartid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + cartid));
            return shoppingCartMapper.maptoDTO(shoppingcart);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<ShoppingCartDTO> getByproductsid(Long productsid, Pageable pageable) {
        List<ShoppingCartDTO> results = new ArrayList<>();
        List<ShoppingCartEntity> shoppingCartEntities = shoppingCartRepository.findByProductsid(productsid,pageable);
        for (ShoppingCartEntity item: shoppingCartEntities
        ) {
            ShoppingCartDTO shoppingCartDTO = shoppingCartMapper.maptoDTO(item);
            results.add(shoppingCartDTO);
        }
        return results;
    }

    @Override
    public List<ShoppingCartDTO> getByUserid(String userid, Pageable pageable) {
        List<ShoppingCartDTO> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<ShoppingCartEntity> shoppingCartEntities = shoppingCartRepository.findByUserid(user,pageable);
        for (ShoppingCartEntity item: shoppingCartEntities
        ) {
            ShoppingCartDTO shoppingCartDTO = shoppingCartMapper.maptoDTO(item);
            results.add(shoppingCartDTO);
        }
        return results;
    }

    @Override
    public List<ShoppingCartDTO> getByStatus( String userid, Pageable pageable) {
        List<ShoppingCartDTO> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<ShoppingCartEntity> shoppingCartUserList = shoppingCartRepository.findByUserid(user,pageable);
        for (ShoppingCartEntity item: shoppingCartUserList
        ) {
            ShoppingCartDTO shoppingCartDTO = null;
            if (item.getStatus() == true){
                 shoppingCartDTO  = shoppingCartMapper.maptoDTO(item);
                results.add(shoppingCartDTO);
            }


        }
        return results;
    }

    @Override
    public void deleteCartByUserid(String userid) {
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
       List<ShoppingCartEntity> shoppingCartEntities = shoppingCartRepository.findByUserid(user);
        for (ShoppingCartEntity item:shoppingCartEntities
             ) {
            if(item.getStatus() == true){
                shoppingCartRepository.deleteByCartid(item.getCartid());
            }
        }
    }

    @Override
    public void deleteByCartid(Long cartid) {
        shoppingCartRepository.deleteByCartid(cartid);
    }

    @Override
    public void createShoppingCart(ShoppingCartDTO shoppingCartDTO) {
        if ( shoppingCartDTO != null) {
            ShoppingCartEntity shoppingCart = shoppingCartMapper.maptoEntity(shoppingCartDTO);
            UserEntity user = userRepository.findByUserid(shoppingCartDTO.getUserid()).orElse(null);
            ProductsEntity products  = productsRepository.findByProductsid(shoppingCartDTO.getProductsid()).orElse(null);
            if (shoppingCart != null) {
                Long QTY = products.getProductsqltk() - shoppingCart.getQty();
                if (QTY >= 0){
                    products.setProductsqltk(QTY);
                    productsRepository.save(products);
                    shoppingCart.setUserid(user);
                    shoppingCart.setProductsid(products);
                    shoppingCart.setStatus(false);
                    shoppingCartRepository.save(shoppingCart);
                }else {
                    throw new RuntimeException("sản phẩm này đã hết ");
                }
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateShoppingCart(ShoppingCartDTO shoppingCartDTO) {
        ShoppingCartEntity existingShoppingcart  = shoppingCartRepository.findByCartid(shoppingCartDTO.getCartid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(shoppingCartDTO, existingShoppingcart);
        shoppingCartRepository.save(existingShoppingcart);
    }
}
