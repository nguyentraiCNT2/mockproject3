package com.guardiannestshop.backend.api.output;

import com.guardiannestshop.backend.dto.*;

import java.util.ArrayList;
import java.util.List;

public class CategoryLV2Output {
    private int page;
    private int totalPage;
    private List<CategoryLV2DTO> listResult = new ArrayList<>();

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

    public List<CategoryLV2DTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<CategoryLV2DTO> listResult) {
        this.listResult = listResult;
    }
}
