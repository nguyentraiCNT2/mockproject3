package com.guardiannestshop.backend.api.output;

import com.guardiannestshop.backend.dto.ProductsDTO;
import com.guardiannestshop.backend.dto.ReviewDTO;

import java.util.ArrayList;
import java.util.List;

public class ReviewOutPut {
    private int page;
    private int totalPage;
    private List<ReviewDTO> listResult = new ArrayList<>();

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

    public List<ReviewDTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<ReviewDTO> listResult) {
        this.listResult = listResult;
    }
}
