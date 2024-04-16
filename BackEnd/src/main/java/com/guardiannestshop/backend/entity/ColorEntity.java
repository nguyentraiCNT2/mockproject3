package com.guardiannestshop.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Colors")
public class ColorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "colorid")
    private Long colorid;
    @Column(name = "colorname",columnDefinition = "NVARCHAR(MAX)")
    private String colorname;
    @Column(name = "colorCore")
    private String colorCore;
    public Long getColorid() {
        return colorid;
    }

    public void setColorid(Long colorid) {
        this.colorid = colorid;
    }

    public String getColorname() {
        return colorname;
    }

    public void setColorname(String colorname) {
        this.colorname = colorname;
    }

    public String getColorCore() {
        return colorCore;
    }

    public void setColorCore(String colorCore) {
        this.colorCore = colorCore;
    }
}
