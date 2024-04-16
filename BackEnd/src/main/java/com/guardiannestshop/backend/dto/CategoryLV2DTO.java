package com.guardiannestshop.backend.dto;

public class CategoryLV2DTO {
    private Long categorylvid;
    private String categorylvname;
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
