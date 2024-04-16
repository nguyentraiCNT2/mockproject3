package com.guardiannestshop.backend.dto;

import java.math.BigDecimal;
import java.util.Date;

public class ImportdetailsDTO {
    private Long importdetailsid;
    private Long productsid;
    private Long  importqty;
    private Date importdate;
    private BigDecimal  importprice;
    public Long getImportdetailsid() {
        return importdetailsid;
    }

    public void setImportdetailsid(Long importdetailsid) {
        this.importdetailsid = importdetailsid;
    }
    public Long getImportqty() {
        return importqty;
    }

    public void setImportqty(Long importqty) {
        this.importqty = importqty;
    }

    public Long getProductsid() {
        return productsid;
    }

    public void setProductsid(Long productsid) {
        this.productsid = productsid;
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
