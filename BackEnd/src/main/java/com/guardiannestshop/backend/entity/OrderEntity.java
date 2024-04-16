package com.guardiannestshop.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "Orders")
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderid")
    private Long orderid;
    @JsonFormat(pattern = "MM-dd-yyyy")
    @Column(name = "orderdate")
    private Date orderdate;
    @JsonFormat(pattern = "MM-dd-yyyy")
    @Column(name = "deliverydate")
    private Date deliverydate;
    @Column(name = "orderstatus", columnDefinition = "NVARCHAR(MAX)")
    private String orderstatus;
    @Column(name = "orderpay", columnDefinition = "NVARCHAR(MAX)")
    private String orderpay;
    @Column(name = "ordercancel", columnDefinition = "NVARCHAR(MAX)")
    private String ordercancel;
    @ManyToOne
    @JoinColumn(name = "userid")
    private UserEntity userid;
    @Column(name = "address", columnDefinition = "NVARCHAR(MAX)")
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

    public UserEntity getUserid() {
        return userid;
    }

    public void setUserid(UserEntity userid) {
        this.userid = userid;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
