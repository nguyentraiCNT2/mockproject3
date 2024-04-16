package com.guardiannestshop.backend.api.controller;


import com.guardiannestshop.backend.api.output.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.service.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/category/api")
public class CategoryController {
    @Autowired
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/admin/category-list")
    public Categoryoutput getAll(@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        Categoryoutput result = new Categoryoutput();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResult(categoryService.getAll(pageable));
        result.setTotalPage((int) Math.ceil((double) (categoryService.totalItem()) / limit));
        model.addAttribute("Categoryoutput", result);
        return result;
    }
    @GetMapping("/admin/category-by-id/{categoryid}")
    public ResponseEntity<?> getByCategoryid(@PathVariable Long categoryid) {
        try {
            CategoryDTO categoryDTO = categoryService.getByCategoryid(categoryid);

            return new ResponseEntity<>(categoryDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/admin/category-by-categoryname-list")
    public Categoryoutput getByCategoryname( @PathVariable String categoryname,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        Categoryoutput result = new Categoryoutput();
        result.setPage(page);
        Pageable pageable = PageRequest.of(page - 1, limit);
        result.setListResult(categoryService.getByCategoryname(categoryname,pageable));
        result.setTotalPage((int) Math.ceil((double) (categoryService.totalItem()) / limit));
        model.addAttribute("Categoryoutput", result);
        return result;
    }

    @PostMapping("/admin/create-category")
    public ResponseEntity<String> createUser(@RequestBody CategoryDTO categoryDTO) {
        try {
            categoryService.createCategory(categoryDTO);
            return new ResponseEntity<>("more success " + categoryDTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/admin/update-category/{categoryid}")
    public ResponseEntity<String> updateRole(@PathVariable Long categoryid, @RequestBody CategoryDTO categoryDTO) {
        try {
            categoryDTO.setCategoryid(categoryid);
            categoryService.updateCategory(categoryDTO);
            return new ResponseEntity<>(categoryDTO+"Cập nhật quyền người dùng thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @DeleteMapping("/admin/delete-category/{categoryid}")
    public ResponseEntity<String> deleteUserAccount(@PathVariable Long categoryid) {
        try {
            categoryService.deleteByCategoryid(categoryid);
            return new ResponseEntity<>("Xóa Ảnh thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
