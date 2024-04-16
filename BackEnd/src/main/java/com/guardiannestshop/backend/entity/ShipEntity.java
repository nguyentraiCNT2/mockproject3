package com.guardiannestshop.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Date;
@Entity
@Table(name = "Ships")
public class ShipEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shipid")
    private Long shipid;
    @Column(name = "shipname",columnDefinition = "NVARCHAR(MAX)")
    private String shipname;
    @Column(name = "shipprice")
    private BigDecimal shipprice;
    @Column(name = "shipdate")
    private Date shipdate;
    @Column(name = "status")
    private boolean status;

    public Long getShipid() {
        return shipid;
    }

    public void setShipid(Long shipid) {
        this.shipid = shipid;
    }

    public String getShipname() {
        return shipname;
    }

    public void setShipname(String shipname) {
        this.shipname = shipname;
    }

    public BigDecimal getShipprice() {
        return shipprice;
    }

    public void setShipprice(BigDecimal shipprice) {
        this.shipprice = shipprice;
    }

    public Date getShipdate() {
        return shipdate;
    }

    public void setShipdate(Date shipdate) {
        this.shipdate = shipdate;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}
