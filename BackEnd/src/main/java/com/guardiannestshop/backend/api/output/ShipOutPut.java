package com.guardiannestshop.backend.api.output;

import com.guardiannestshop.backend.dto.*;

import java.util.ArrayList;
import java.util.List;

public class ShipOutPut {
    private int page;
    private int totalPage;
    private List<ShipDTO> listResult = new ArrayList<>();

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public List<ShipDTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<ShipDTO> listResult) {
        this.listResult = listResult;
    }
}
