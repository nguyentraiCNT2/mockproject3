package com.guardiannestshop.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Reviews")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reviewid")
    private Long reviewid;
    @Column(name = "contents",columnDefinition = "NVARCHAR(MAX)")
    private String contents;
    @Column(name = "evaluate")
    private Long evaluate;
    @Column(name = "status")
    private boolean status;
    @ManyToOne
    @JoinColumn(name = "productsid")
    private ProductsEntity productsid;
    @ManyToOne
    @JoinColumn(name = "userid")
    private UserEntity userid;

    public Long getReviewid() {
        return reviewid;
    }

    public void setReviewid(Long reviewid) {
        this.reviewid = reviewid;
    }

    public String getContents() {
        return contents;
    }

    public void setContents(String contents) {
        this.contents = contents;
    }

    public Long getEvaluate() {
        return evaluate;
    }

    public void setEvaluate(Long evaluate) {
        this.evaluate = evaluate;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public ProductsEntity getProductsid() {
        return productsid;
    }

    public void setProductsid(ProductsEntity productsid) {
        this.productsid = productsid;
    }

    public UserEntity getUserid() {
        return userid;
    }

    public void setUserid(UserEntity userid) {
        this.userid = userid;
    }
}
