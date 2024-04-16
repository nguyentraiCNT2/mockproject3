package com.guardiannestshop.backend.api.output;
import com.guardiannestshop.backend.dto.*;

import java.util.ArrayList;
import java.util.List;

public class RoleOutPut {
    private int page;
    private int totalPage;
    private List<RoleDTO> listResult = new ArrayList<>();

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

    public List<RoleDTO> getListResult() {
        return listResult;
    }

    public void setListResult(List<RoleDTO> listResult) {
        this.listResult = listResult;
    }
}
