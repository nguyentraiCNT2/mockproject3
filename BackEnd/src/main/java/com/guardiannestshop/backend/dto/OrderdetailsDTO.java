package com.guardiannestshop.backend.dto;

import java.math.BigDecimal;

public class OrderdetailsDTO {
    private Long orderdetailid;
    private Long productsid;
    private BigDecimal totalamount;
    private BigDecimal unitprice;
    private Long shipid;
    private Long orderqty;
    private Long orderid;

    public Long getOrderdetailid() {
        return orderdetailid;
    }

    public void setOrderdetailid(Long orderdetailid) {
        this.orderdetailid = orderdetailid;
    }

    public Long getProductsid() {
        return productsid;
    }

    public void setProductsid(Long productsid) {
        this.productsid = productsid;
    }

    public BigDecimal getTotalamount() {
        return totalamount;
    }

    public void setTotalamount(BigDecimal totalamount) {
        this.totalamount = totalamount;
    }

    public BigDecimal getUnitprice() {
        return unitprice;
    }

    public void setUnitprice(BigDecimal unitprice) {
        this.unitprice = unitprice;
    }

    public Long getShipid() {
        return shipid;
    }

    public void setShipid(Long shipid) {
        this.shipid = shipid;
    }

    public Long getOrderid() {
        return orderid;
    }

    public void setOrderid(Long orderid) {
        this.orderid = orderid;
    }

    public Long getOrderqty() {
        return orderqty;
    }

    public void setOrderqty(Long orderqty) {
        this.orderqty = orderqty;
    }
}
