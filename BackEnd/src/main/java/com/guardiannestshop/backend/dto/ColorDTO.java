package com.guardiannestshop.backend.dto;

public class ColorDTO {
    private Long colorid;
    private String colorname;
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
