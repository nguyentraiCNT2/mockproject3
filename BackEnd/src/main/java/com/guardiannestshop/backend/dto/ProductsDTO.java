package com.guardiannestshop.backend.dto;

import java.math.BigDecimal;

public class ProductsDTO {
    private Long productsid;
    private String productcore;
    private String productname;
    private BigDecimal productprice;
    private String productsdescribe;
    private Long productsview;
    private Long productsqltk;
    private Long colorid;
    private Long categoryid;
    private Long categoryLV2id;

    private boolean productsstatus;

    private String imagesmain;

    private String images2;

    private String images3;

    private String images4;

    private String images5;
    public Long getProductsid() {
        return productsid;
    }

    public void setProductsid(Long productsid) {
        this.productsid = productsid;
    }

    public String getProductcore() {
        return productcore;
    }

    public void setProductcore(String productcore) {
        this.productcore = productcore;
    }

    public String getProductname() {
        return productname;
    }

    public void setProductname(String productname) {
        this.productname = productname;
    }

    public BigDecimal getProductprice() {
        return productprice;
    }

    public void setProductprice(BigDecimal productprice) {
        this.productprice = productprice;
    }

    public String getProductsdescribe() {
        return productsdescribe;
    }

    public void setProductsdescribe(String productsdescribe) {
        this.productsdescribe = productsdescribe;
    }

    public Long getProductsview() {
        return productsview;
    }

    public void setProductsview(Long productsview) {
        this.productsview = productsview;
    }

    public Long getProductsqltk() {
        return productsqltk;
    }

    public void setProductsqltk(Long productsqltk) {
        this.productsqltk = productsqltk;
    }

    public Long getColorid() {
        return colorid;
    }

    public void setColorid(Long colorid) {
        this.colorid = colorid;
    }

    public Long getCategoryid() {
        return categoryid;
    }

    public void setCategoryid(Long categoryid) {
        this.categoryid = categoryid;
    }

    public Long getCategoryLV2id() {
        return categoryLV2id;
    }

    public void setCategoryLV2id(Long categoryLV2id) {
        this.categoryLV2id = categoryLV2id;
    }


    public boolean isProductsstatus() {
        return productsstatus;
    }

    public void setProductsstatus(boolean productsstatus) {
        this.productsstatus = productsstatus;
    }

    public String getImagesmain() {
        return imagesmain;
    }

    public void setImagesmain(String imagesmain) {
        this.imagesmain = imagesmain;
    }

    public String getImages2() {
        return images2;
    }

    public void setImages2(String images2) {
        this.images2 = images2;
    }

    public String getImages3() {
        return images3;
    }

    public void setImages3(String images3) {
        this.images3 = images3;
    }

    public String getImages4() {
        return images4;
    }

    public void setImages4(String images4) {
        this.images4 = images4;
    }

    public String getImages5() {
        return images5;
    }

    public void setImages5(String images5) {
        this.images5 = images5;
    }
}
