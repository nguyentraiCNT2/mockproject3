package com.guardiannestshop.backend.api.output;

import com.guardiannestshop.backend.dto.*;

import java.util.ArrayList;
import java.util.List;

public class UserAddressOutPut {
    private int page;
    private int totalPage;
    private List<UserAddressDTO> listResult = new ArrayList<>();

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

    public List<UserAddressDTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<UserAddressDTO> listResult) {
        this.listResult = listResult;
    }
}
