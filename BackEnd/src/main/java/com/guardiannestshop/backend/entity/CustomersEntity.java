package com.guardiannestshop.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Customers")
public class CustomersEntity {
    @Id
    @Column(name = "customerid")
    private  String customerid;
    @Column(name = "customername")
    private String customername;
    @Column(name = "password")
    private String password;
    @Column(name = "firtname",columnDefinition = "NVARCHAR(MAX)")
    private String firtname;
    @Column(name = "lastname",columnDefinition = "NVARCHAR(MAX)")
    private String lastname;
    @Column(name = "phone")
    private String phone;
    @Column(name = "email")
    private String email;
    @Column(name = "images")
    private String images;
    @ManyToOne
    @JoinColumn(name = "roleid")
    private RoleEntity roleid;

    public String getCustomerid() {
        return customerid;
    }

    public void setCustomerid(String customerid) {
        this.customerid = customerid;
    }

    public String getCustomername() {
        return customername;
    }

    public void setCustomername(String customername) {
        this.customername = customername;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirtname() {
        return firtname;
    }

    public void setFirtname(String firtname) {
        this.firtname = firtname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }

    public RoleEntity getRoleid() {
        return roleid;
    }

    public void setRoleid(RoleEntity roleid) {
        this.roleid = roleid;
    }
}
