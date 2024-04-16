package com.guardiannestshop.backend.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "Importdetails")
public class ImportdetailsEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "importdetailsid")
    private Long importdetailsid;
    @ManyToOne
    @JoinColumn(name = "productsid")
    private ProductsEntity productsid;
    @Column(name = "importqty")
    private Long  importqty;
    @Column(name = "importdate")
    private Date  importdate;
    @Column(name = "importprice")
    private BigDecimal importprice;

    public Long getImportdetailsid() {
        return importdetailsid;
    }

    public void setImportdetailsid(Long importdetailsid) {
        this.importdetailsid = importdetailsid;
    }

    public ProductsEntity getProductsid() {
        return productsid;
    }

    public void setProductsid(ProductsEntity productsid) {
        this.productsid = productsid;
    }

    public Long getImportqty() {
        return importqty;
    }

    public void setImportqty(Long importqty) {
        this.importqty = importqty;
    }

    public Date getImportdate() {
        return importdate;
    }

    public void setImportdate(Date importdate) {
        this.importdate = importdate;
    }

    public BigDecimal getImportprice() {
        return importprice;
    }

    public void setImportprice(BigDecimal importprice) {
        this.importprice = importprice;
    }
}
