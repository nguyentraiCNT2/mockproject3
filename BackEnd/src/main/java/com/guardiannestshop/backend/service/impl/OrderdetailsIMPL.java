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
public class OrderdetailsIMPL implements OrderdetailsService {
    @Autowired
    private final OrderdetailsRepository orderdetailsRepository;
    private OrderRepository orderRepository;
    private ProductsRepository productsRepository;
    private ShipRepository shipRepository;
    private ModelMapper modelMapper;
    private OrderdetailsMapper orderdetailsMapper;

    public OrderdetailsIMPL(OrderdetailsRepository orderdetailsRepository, OrderRepository orderRepository, ProductsRepository productsRepository, ShipRepository shipRepository, ModelMapper modelMapper, OrderdetailsMapper orderdetailsMapper) {
        this.orderdetailsRepository = orderdetailsRepository;
        this.orderRepository = orderRepository;
        this.productsRepository = productsRepository;
        this.shipRepository = shipRepository;
        this.modelMapper = modelMapper;
        this.orderdetailsMapper = orderdetailsMapper;
    }


    @Override
    public List<OrderdetailsDTO> getAll(Pageable pageable) {
        List<OrderdetailsDTO> results = new ArrayList<>();
        List<OrderdetailsEntity> orderdetailsEntities = orderdetailsRepository.findAll(pageable).getContent();
        for (OrderdetailsEntity item: orderdetailsEntities
        ) {
            OrderdetailsDTO DTO = orderdetailsMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int)orderdetailsRepository.count();
    }

    @Override
    public OrderdetailsDTO getByOrderdetailid(Long orderdetailid) {
        try {
            OrderdetailsEntity orderdetailsEntity = orderdetailsRepository.findByOrderdetailid(orderdetailid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + orderdetailid));
            return orderdetailsMapper.maptoDTO(orderdetailsEntity);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }


    @Override
    public List<OrderdetailsDTO> getByProductsid(Long productsid, Pageable pageable) {
        List<OrderdetailsDTO> results = new ArrayList<>();
        ProductsEntity products = productsRepository.findByProductsid(productsid).orElse(null);
        List<OrderdetailsEntity> orderdetailsEntities = orderdetailsRepository.findByProductsid(products,pageable);
        for (OrderdetailsEntity item: orderdetailsEntities
        ) {
            OrderdetailsDTO DTO = orderdetailsMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<OrderdetailsDTO> getByShipid(Long shipid, Pageable pageable) {
        List<OrderdetailsDTO> results = new ArrayList<>();
        ShipEntity ship = shipRepository.findByShipid(shipid).orElse(null);
        List<OrderdetailsEntity> orderdetailsEntities = orderdetailsRepository.findByShipid(ship,pageable);
        for (OrderdetailsEntity item: orderdetailsEntities
        ) {
            OrderdetailsDTO DTO = orderdetailsMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<OrderdetailsDTO> getByOrderid(Long orderid, Pageable pageable) {
        List<OrderdetailsDTO> results = new ArrayList<>();
        OrderEntity order = orderRepository.findByOrderid(orderid).orElse(null);
        List<OrderdetailsEntity> orderdetailsEntities = orderdetailsRepository.findByOrderid(order,pageable);
        for (OrderdetailsEntity item: orderdetailsEntities
        ) {
            OrderdetailsDTO DTO = orderdetailsMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }


    @Override
    public void deleteByOrderdetailid(Long orderdetailid) {
        orderdetailsRepository.deleteByOrderdetailid(orderdetailid);
    }

    @Override
    public void createOrderdetails(OrderdetailsDTO orderdetailsDTO) {
        if ( orderdetailsDTO != null) {
            OrderdetailsEntity orderdetails = orderdetailsMapper.maptoEntity(orderdetailsDTO);
            ProductsEntity products = productsRepository.findByProductsid(orderdetailsDTO.getProductsid()).orElse(null);
            ShipEntity ship = shipRepository.findByShipid(orderdetailsDTO.getShipid()).orElse(null);
            if (orderdetails != null) {
                orderdetails.setProductsid(products);
                orderdetails.setShipid(ship);
                orderdetailsRepository.save(orderdetails);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateOrderdetails(OrderdetailsDTO orderdetailsDTO) {
        OrderdetailsEntity existingOrderdetails  = orderdetailsRepository.findByOrderdetailid(orderdetailsDTO.getOrderdetailid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(orderdetailsDTO, existingOrderdetails);
        orderdetailsRepository.save(existingOrderdetails);
    }
}
