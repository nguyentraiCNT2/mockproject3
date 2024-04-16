package com.guardiannestshop.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "CategoryLV2")
public class CategoryLV2Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "categorylvid")
    private Long categorylvid;
    @Column(name = "categorylvname",columnDefinition = "NVARCHAR(MAX)")
    private String categorylvname;
    @Column(name = "categoryimageslogo")
    private String categoryimageslogo;

    public Long getCategorylvid() {
        return categorylvid;
    }

    public void setCategorylvid(Long categorylvid) {
        this.categorylvid = categorylvid;
    }

    public String getCategorylvname() {
        return categorylvname;
    }

    public void setCategorylvname(String categorylvname) {
        this.categorylvname = categorylvname;
    }

    public String getCategoryimageslogo() {
        return categoryimageslogo;
    }

    public void setCategoryimageslogo(String categoryimageslogo) {
        this.categoryimageslogo = categoryimageslogo;
    }
}
