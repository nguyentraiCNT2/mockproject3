package com.guardiannestshop.backend.dto;

import java.sql.Date;

public class OrderOTD {
    private Long orderid;

    private Date orderdate;
    private Date deliverydate;
    private String orderstatus;
    private String orderpay;
    private String ordercancel;
    private String userid;
    private String address;
    public Long getOrderid() {
        return orderid;
    }

    public void setOrderid(Long orderid) {
        this.orderid = orderid;
    }

    public Date getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(Date orderdate) {
        this.orderdate = orderdate;
    }

    public Date getDeliverydate() {
        return deliverydate;
    }

    public void setDeliverydate(Date deliverydate) {
        this.deliverydate = deliverydate;
    }

    public String getOrderstatus() {
        return orderstatus;
    }

    public void setOrderstatus(String orderstatus) {
        this.orderstatus = orderstatus;
    }

    public String getOrderpay() {
        return orderpay;
    }

    public void setOrderpay(String orderpay) {
        this.orderpay = orderpay;
    }

    public String getOrdercancel() {
        return ordercancel;
    }

    public void setOrdercancel(String ordercancel) {
        this.ordercancel = ordercancel;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
