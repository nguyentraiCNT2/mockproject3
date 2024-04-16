package com.guardiannestshop.backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.sql.Date;
@Entity
@Table(name = "ShoppingCart")
public class ShoppingCartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cartid")
    private Long cartid;
    @ManyToOne
    @JoinColumn(name = "productsid")
    private ProductsEntity productsid;
    @JsonFormat(pattern = "MM-dd-yyyy")
    @Column(name = "dateadd")
    private Date dateadd;
    @Column(name = "qty")
    private Long qty;
    @ManyToOne
    @JoinColumn(name = "userid")
    private UserEntity userid;

    @Column(name = "status")
    private Boolean status;

    public Long getCartid() {
        return cartid;
    }

    public void setCartid(Long cartid) {
        this.cartid = cartid;
    }

    public ProductsEntity getProductsid() {
        return productsid;
    }

    public void setProductsid(ProductsEntity productsid) {
        this.productsid = productsid;
    }

    public Date getDateadd() {
        return dateadd;
    }

    public void setDateadd(Date dateadd) {
        this.dateadd = dateadd;
    }

    public Long getQty() {
        return qty;
    }

    public void setQty(Long qty) {
        this.qty = qty;
    }

    public UserEntity getUserid() {
        return userid;
    }

    public void setUserid(UserEntity userid) {
        this.userid = userid;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
