package com.guardiannestshop.backend.dto;



import java.util.List;

public class OrderRequestDTO {
    private OrderOTD order;
    private List<OrderdetailsDTO> orderDetailsList;

    public OrderOTD getOrder() {
        return order;
    }

    public void setOrder(OrderOTD order) {
        this.order = order;
    }

    public List<OrderdetailsDTO> getOrderDetailsList() {
        return orderDetailsList;
    }

    public void setOrderDetailsList(List<OrderdetailsDTO> orderDetailsList) {
        this.orderDetailsList = orderDetailsList;
    }
}
