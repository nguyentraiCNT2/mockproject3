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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin/category-level-2/api")
public class CategoryLV2Controller {
    @Autowired
    private final CategoryLV2Service categoryLV2Service;

    public CategoryLV2Controller(CategoryLV2Service categoryLV2Service) {
        this.categoryLV2Service = categoryLV2Service;
    }

    @GetMapping("/admin/category-list")
    public CategoryLV2Output getAll(@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        CategoryLV2Output result = new CategoryLV2Output();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(categoryLV2Service.getAll(pageable));
        result.setTotalPage((int) Math.ceil((double) (categoryLV2Service.totalItem()) / limit));
        model.addAttribute("Categoryoutput", result);
        return result;
    }

    @GetMapping("/admin/category-level-2-by-id/{categorylvid}")
    public ResponseEntity<?> findByCategorylvid(@PathVariable Long categorylvid) {
        try {
            CategoryLV2DTO categoryLV2DTO = categoryLV2Service.findByCategorylvid(categorylvid);

            return new ResponseEntity<>(categoryLV2DTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/category-level-2-by-categorylvname/{categorylvname}")
    public CategoryLV2Output getAll(@PathVariable String categorylvname,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        CategoryLV2Output result = new CategoryLV2Output();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(categoryLV2Service.findByCategorylvname(categorylvname,pageable));
        result.setTotalPage((int) Math.ceil((double) (categoryLV2Service.totalItem()) / limit));
        model.addAttribute("Categoryoutput", result);
        return result;
    }
    @PostMapping("/admin/create-category-level-2")
    public ResponseEntity<String> createCategorylv(@RequestBody CategoryLV2DTO categoryLV2DTO) {
        try {
            categoryLV2Service.createCategorylvname(categoryLV2DTO);
            return new ResponseEntity<>("more success " + categoryLV2DTO, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/admin/update-category-level-2/{categorylvid}")
    public ResponseEntity<String> updateRole(@PathVariable Long categorylvid, @RequestBody CategoryLV2DTO categoryLV2DTO) {
        try {
            categoryLV2DTO.setCategorylvid(categorylvid);
            categoryLV2Service.updateCategorylvname(categoryLV2DTO);
            return new ResponseEntity<>(categoryLV2DTO+"Cập nhật quyền người dùng thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @DeleteMapping("/admin/delete-category-level-2/{categorylvid}")
    public ResponseEntity<String> deleteUserAccount(@PathVariable Long categorylvid) {
        try {
            categoryLV2Service.deleteByCategorylvid(categorylvid);
            return new ResponseEntity<>("Xóa  thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{categorylvid}/upload-image")
    public ResponseEntity<Void> uploadImage(@PathVariable Long categorylvid, @RequestParam("file") MultipartFile file) {
        try {
            categoryLV2Service.uploadImage(categorylvid, file);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
