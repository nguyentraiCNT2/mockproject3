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
@RequestMapping("/admin/color/api")
public class ColorController {
    @Autowired
    private final ColorService colorService;

    public ColorController(ColorService colorService) {
        this.colorService = colorService;
    }
    @GetMapping("/admin/color-list")
    public ColorOutput getAll(@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ColorOutput result = new ColorOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(colorService.getAll(pageable));
        result.setTotalPage((int) Math.ceil((double) (colorService.totalItem()) / limit));
        model.addAttribute("ImagesOutput", result);
        return result;
    }

    @GetMapping("/admin/color-by-id/{colorid}")
    public ResponseEntity<?> getByColorid(@PathVariable Long colorid) {
        try {
            ColorDTO colorDTO = colorService.getByColorid(colorid);

            return new ResponseEntity<>(colorDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/color-by-colorname/{colorname}")
    public ColorOutput getAll(@PathVariable String colorname,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ColorOutput result = new ColorOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(colorService.getByColorname(colorname,pageable));
        result.setTotalPage((int) Math.ceil((double) (colorService.totalItem()) / limit));
        model.addAttribute("ImagesOutput", result);
        return result;
    }

    @PostMapping("/admin/create-color")
    public ResponseEntity<String> createColor(@RequestBody ColorDTO colorDTO) {
        try {
            colorService.createColor(colorDTO);
            return new ResponseEntity<>("more success " , HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/admin/update-color/{colorid}")
    public ResponseEntity<String> updateColor(@PathVariable Long colorid, @RequestBody ColorDTO colorDTO) {
        try {
            colorDTO.setColorid(colorid);
            colorService.updateColor(colorDTO);
            return new ResponseEntity<>(colorDTO+"Cập nhật quyền người dùng thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional
    @DeleteMapping("/admin/delete-color/{colorid}")
    public ResponseEntity<String> deleteByColorid(@PathVariable Long colorid) {
        try {
            colorService.deleteByColorid(colorid);
            return new ResponseEntity<>("Xóa Ảnh thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
