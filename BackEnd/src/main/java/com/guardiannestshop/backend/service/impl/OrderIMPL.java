package com.guardiannestshop.backend.service.impl;

import com.guardiannestshop.backend.FunctionalAccessory.RandomId;
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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderIMPL implements OrderService {
    @Autowired
    private final OrderRepository orderRepository;
    private ModelMapper modelMapper;
    private OrderMapper orderMapper;
    private UserRepository userRepository;
    private OrderdetailsRepository orderdetailsRepository;
    private ProductsRepository productsRepository;
    private ShipRepository shipRepository;
    private CustomersRepository customersRepository;
    private UserAddressRepository userAddressRepository;
    public OrderIMPL(OrderRepository orderRepository, ModelMapper modelMapper, OrderMapper orderMapper, UserRepository userRepository, OrderdetailsRepository orderdetailsRepository, ProductsRepository productsRepository, ShipRepository shipRepository, CustomersRepository customersRepository, UserAddressRepository userAddressRepository) {
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.orderMapper = orderMapper;
        this.userRepository = userRepository;
        this.orderdetailsRepository = orderdetailsRepository;
        this.productsRepository = productsRepository;
        this.shipRepository = shipRepository;
        this.customersRepository = customersRepository;
        this.userAddressRepository = userAddressRepository;
    }


    @Override
    public List<OrderOTD> getAll(Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        List<OrderEntity> orderEntities = orderRepository.findAll(pageable).getContent();
        for (OrderEntity item: orderEntities
        ) {
            OrderOTD DTO = orderMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int)orderRepository.count();
    }

    @Override
    public OrderOTD findByOrderid(Long orderid) {
        try {
            OrderEntity order = orderRepository.findByOrderid(orderid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + orderid));
            return orderMapper.maptoDTO(order);

        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public OrderRequestDTO getByOrderid(Long orderid) {
        try {
            OrderEntity orderEntity = orderRepository.findByOrderid(orderid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + orderid));
            List<OrderdetailsEntity>  orderdetails = orderdetailsRepository.findByOrderid(orderEntity);
           OrderOTD orderOTD = modelMapper.map(orderEntity, OrderOTD.class);
            List<OrderdetailsDTO> orderOTDList = new ArrayList<>();
            OrderRequestDTO orderRequestDTO  =  new OrderRequestDTO();
            for (OrderdetailsEntity item:orderdetails
            ) {
                OrderdetailsDTO otd = modelMapper.map(item,OrderdetailsDTO.class);
                orderOTDList.add(otd);
            }
            orderRequestDTO.setOrder(orderOTD);
            orderRequestDTO.setOrderDetailsList(orderOTDList);
            return orderRequestDTO;
        }catch (Exception e){
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }

    }

    @Override
    public List<OrderOTD> getByOrderstatus(String orderstatus, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        List<OrderEntity> orderdetailsEntities = orderRepository.findByOrderstatus(orderstatus,pageable);
        for (OrderEntity item: orderdetailsEntities
        ) {
            OrderOTD DTO = modelMapper.map(item, OrderOTD.class);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByOrderpay(String orderpay, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        List<OrderEntity> orderdetailsEntities = orderRepository.findByOrderpay(orderpay,pageable);
        for (OrderEntity item: orderdetailsEntities
        ) {
            OrderOTD DTO = modelMapper.map(item, OrderOTD.class);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByOrdercancel(String ordercancel, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        List<OrderEntity> orderdetailsEntities = orderRepository.findByOrdercancel(ordercancel,pageable);
        for (OrderEntity item: orderdetailsEntities
        ) {
            OrderOTD DTO = modelMapper.map(item, OrderOTD.class);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByUserid(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            OrderOTD DTO = orderMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByStatusUser(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            if (item.getOrderstatus().equals("Đang chuẩn bị hàng") && item.getOrdercancel().equals("Xác Nhận") ){
                OrderOTD DTO = orderMapper.maptoDTO(item);
                results.add(DTO);
            }
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByStatusUser2(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            if (item.getOrderstatus().equals("Đang giao hàng") && item.getOrdercancel().equals("Xác Nhận") ){
                OrderOTD DTO = orderMapper.maptoDTO(item);
                results.add(DTO);
            }
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByStatusUser3(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            if (item.getOrderstatus().equals("Đã giao ") && item.getOrdercancel().equals("Xác Nhận") && item.getOrderpay().equals("Đã thanh toán") ){
                OrderOTD DTO = orderMapper.maptoDTO(item);
                results.add(DTO);
            }
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByOrderPayUser(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            if (item.getOrderpay().equals("Đã thanh toán") && item.getOrdercancel().equals("Xác Nhận") ){
                OrderOTD DTO = orderMapper.maptoDTO(item);
                results.add(DTO);
            }
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByOrderPayUser2(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            if (item.getOrderpay().equals("Chưa thanh toán") && item.getOrdercancel().equals("Xác Nhận") ){
                OrderOTD DTO = orderMapper.maptoDTO(item);
                results.add(DTO);
            }
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByOrdercancelUser(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            if (item.getOrdercancel().equals("Xác Nhận")){
                OrderOTD DTO = orderMapper.maptoDTO(item);
                results.add(DTO);
            }
        }
        return results;
    }

    @Override
    public List<OrderOTD> getByOrdercancelUser2(String userid, Pageable pageable) {
        List<OrderOTD> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<OrderEntity> orderEntities = orderRepository.findByUserid(user,pageable);
        for (OrderEntity item: orderEntities
        ) {
            if (item.getOrdercancel().equals("Đã hủy")){
                OrderOTD DTO = orderMapper.maptoDTO(item);
                results.add(DTO);
            }
        }
        return results;
    }

    @Override
    public void placeOrder(OrderOTD order, List<OrderdetailsDTO> orderDetailsList) {
        Date date = new Date();
        java.sql.Date sqlDate = new java.sql.Date(date.getTime());
        OrderEntity orderEntity = orderMapper.maptoEntity(order);
        UserEntity user = userRepository.findByUserid(order.getUserid()).orElse(null);
        CustomersEntity customers = new CustomersEntity();
        if (orderEntity != null && orderDetailsList.size() != 0 ){
            orderEntity.setUserid(user);
            orderEntity.setOrderdate(sqlDate);
            orderEntity.setOrdercancel("Xác Nhận");
            orderEntity.setOrderpay("Chưa thanh toán");
            orderEntity.setOrderstatus("Đang chuẩn bị hàng");
            OrderEntity saveorder = orderRepository.save(orderEntity);
            String customerid = RandomId.generateRandomId(10);
            customers.setCustomerid(customerid);
            customers.setCustomername(user.getUsername());
            customers.setFirtname(user.getFirtname());
            customers.setLastname(user.getLastname());
            customers.setEmail(user.getEmail());
            customers.setRoleid(user.getRoleid());
            customers.setPhone(user.getPhone());
            customers.setPassword(user.getPassword());
            customers.setImages(user.getImages());
            customersRepository.save(customers);
            for ( OrderdetailsDTO item : orderDetailsList
                 ) {
                OrderdetailsEntity orderdetails = modelMapper.map(item,OrderdetailsEntity.class);
                ShipEntity ship = shipRepository.findByShipid(item.getShipid()).orElse(null);
                ProductsEntity products = productsRepository.findByProductsid(item.getProductsid()).orElse(null);
                if (products.getProductsqltk() > 0 && products.getProductsqltk() > orderdetails.getOrderqty()){
                    orderdetails.setShipid(ship);
                    orderdetails.setProductsid(products);
                    orderdetails.setOrderid(saveorder);
                    orderdetails.setUnitprice(products.getProductprice());
                    BigDecimal qty  = BigDecimal.valueOf(orderdetails.getOrderqty());
                    BigDecimal Totalamount = qty.multiply(products.getProductprice());
                    orderdetails.setTotalamount(Totalamount);
                    products.setProductsqltk(products.getProductsqltk() - orderdetails.getOrderqty());
                    orderdetailsRepository.save(orderdetails);
                    productsRepository.save(products);

                }
                else {
                    throw new RuntimeException("Sản phẩm đã hết hàng");
                }
            }
        }
    }

    @Override
    public void approveOrders(OrderOTD order, List<OrderdetailsDTO> orderDetailsList) {
        Date date = new Date();
        OrderEntity orderEntity = orderRepository.findByOrderid(order.getOrderid()).orElseThrow(()-> new RuntimeException("khong co du lieu"));
        if (orderEntity != null && orderDetailsList.size() != 0 ){
            OrderEntity saveorder = orderRepository.save(orderEntity);
            for ( OrderdetailsDTO item : orderDetailsList
            ) {
                List<OrderdetailsEntity>  orderdetails = orderdetailsRepository.findByOrderid(orderEntity);
                for (OrderdetailsEntity orderitem: orderdetails
                ) {
                    orderdetailsRepository.save(orderitem);
                }
            }
        }
    }

    public static Long convertBigDecimalToLong(BigDecimal bigDecimalValue) {
        // Kiểm tra nếu giá trị có phần thập phân
        if (bigDecimalValue.scale() > 0) {
            // Nếu có phần thập phân, không thể chuyển đổi thành Long mà không mất thông tin
            return null;
        }

        // Kiểm tra xem giá trị có vượt qua giới hạn của Long không
        if (bigDecimalValue.compareTo(BigDecimal.valueOf(Long.MAX_VALUE)) > 0 ||
                bigDecimalValue.compareTo(BigDecimal.valueOf(Long.MIN_VALUE)) < 0) {
            // Nếu giá trị vượt qua giới hạn của Long, không thể chuyển đổi thành Long mà không mất thông tin
            return null;
        }

        // Chuyển đổi BigDecimal sang Long
        return bigDecimalValue.longValue();
    }
    @Override
    public void deleteByOrderid(Long orderid) {
        orderRepository.deleteByOrderid(orderid);
    }

    @Override
    public void createOrder(OrderOTD orderOTD) {
        if ( orderOTD != null) {
            OrderEntity order = orderMapper.maptoEntity(orderOTD);
            UserEntity user = userRepository.findByUserid(orderOTD.getUserid()).orElse(null);
            if (order != null) {
                order.setUserid(user);
                orderRepository.save(order);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateOrder(OrderOTD orderOTD) {
        OrderEntity existinOrder  = orderRepository.findByOrderid(orderOTD.getOrderid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(orderOTD, existinOrder);
        orderRepository.save(existinOrder);
    }
}
