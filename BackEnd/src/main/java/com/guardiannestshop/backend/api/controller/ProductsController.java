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
import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/admin/product/api")
public class ProductsController {
    @Autowired
    private ProductsService productsService;

    @GetMapping("/admin/product-list")
    public ProductOutput getAll(@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getAll(pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }

    @GetMapping("/admin/product-by-categoryid-list/{categoryid}")
    public ProductOutput getByCategoryid(@PathVariable Long categoryid,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByCategoryid(categoryid,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/admin/product-by-categoryid-list-desc/{categoryid}")
    public ProductOutput getByCategoryidDesc(@PathVariable Long categoryid,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByCategoryidByProductpriceDesc(categoryid,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/admin/product-by-categoryid-list-asc/{categoryid}")
    public ProductOutput getByCategoryidAsc(@PathVariable Long categoryid,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByCategoryidByProductpriceAsc(categoryid,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/admin/product-by-category-level2-id-list/{categoryLV2id}")
    public ProductOutput getByCategoryLV2id(@PathVariable Long categoryLV2id,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByCategoryLV2id(categoryLV2id,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }

    @GetMapping("/admin/product-by-color-id-list/{colorid}")
    public ProductOutput getByColorid(@PathVariable Long colorid,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByColorid(colorid,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/admin/product-by-name-list/{productname}")
    public ProductOutput getByLoveListid(@PathVariable String productname,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByProductname(productname,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/admin/product-by-id/{productsid}")
    public ResponseEntity<?> getByProductsid(@PathVariable Long productsid) {
        try {
            ProductsDTO productsDTO = productsService.getByProductsid(productsid);

            return new ResponseEntity<>(productsDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/admin/product-by-core/{core}")
    public ResponseEntity<?> getByProductsid(@PathVariable String core) {
        try {
           List<ProductsDTO>  productsDTO = productsService.getByCore(core);
            return new ResponseEntity<>(productsDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/admin/create-product")
    public ResponseEntity<String> createProducts(@RequestBody ProductsDTO productsDTO) {
        try {
           productsService.createProducts(productsDTO);
            return new ResponseEntity<>("more success ", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/admin/update-product/{productsid}")
    public ResponseEntity<String> updateProducts(@PathVariable Long productsid, @RequestBody ProductsDTO productsDTO) {
        try {
            productsDTO.setProductsid(productsid);
            productsService.updateProducts(productsDTO);
            return new ResponseEntity<>(productsDTO+"Cập nhật quyền người dùng thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // xóa dữ liệu
    @Transactional
    @DeleteMapping("/admin/delete-product/{productsid}")
    public ResponseEntity<String> deleteUserAccount(@PathVariable  Long productsid) {
        try {
            productsService.deleteByProductsid(productsid);
            return new ResponseEntity<>("Xóa Ảnh thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/{productname}/upload-image-so-1")
    public ResponseEntity<Void> uploadImage1(@PathVariable String productname, @RequestParam("file") MultipartFile file) {
        try {
            productsService.uploadImage1(productname, file);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/{productname}/upload-image-so-2")
    public ResponseEntity<Void> uploadImage2(@PathVariable String productname, @RequestParam("file") MultipartFile file) {
        try {
            productsService.uploadImage2(productname, file);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/{productname}/upload-image-so-3")
    public ResponseEntity<Void> uploadImage3(@PathVariable String productname, @RequestParam("file") MultipartFile file) {
        try {
            productsService.uploadImage3(productname, file);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/{productname}/upload-image-so-4")
    public ResponseEntity<Void> uploadImage4(@PathVariable String productname, @RequestParam("file") MultipartFile file) {
        try {
            productsService.uploadImage4(productname, file);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @PostMapping("/{productname}/upload-image-so-5")
    public ResponseEntity<Void> uploadImage5(@PathVariable String productname, @RequestParam("file") MultipartFile file) {
        try {
            productsService.uploadImage5(productname, file);
            return ResponseEntity.ok().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/filter/{categoryid}")
    public ProductOutput filterProducts(
            @PathVariable Long categoryid,
            @RequestParam(name = "color", required = false) Long color,
            @RequestParam(name = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(name = "maxPrice", required = false) BigDecimal maxPrice,
            @RequestParam("page") int page,
            @RequestParam("limit") int limit,
            Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.filterProducts(categoryid,color, minPrice, maxPrice,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;

    }


    @GetMapping("/admin/product-by-categorylvid-list-desc/{categoryLV2id}")
    public ProductOutput getByCategorylvidDesc(@PathVariable Long categoryLV2id,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByCategoryLV2idByProductpriceDesc(categoryLV2id,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/admin/product-by-categorylvid-list-asc/{categoryLV2id}")
    public ProductOutput getByCategoryLVidAsc(@PathVariable Long categoryLV2id,@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.getByCategoryLV2idByProductpriceAsc(categoryLV2id,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }

    @GetMapping("/filter/categoryLV2id/{categoryLV2id}")
    public ProductOutput filterProductsLV2(
            @PathVariable Long categoryLV2id,
            @RequestParam(name = "color", required = false) Long color,
            @RequestParam(name = "minPrice", required = false) BigDecimal minPrice,
            @RequestParam(name = "maxPrice", required = false) BigDecimal maxPrice,
            @RequestParam("page") int page,
            @RequestParam("limit") int limit,
            Model model) {
        ProductOutput result = new ProductOutput();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(productsService.filterProductscategotylv2(categoryLV2id,color, minPrice, maxPrice,pageable));
        result.setTotalPage((int) Math.ceil((double) (productsService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;

    }
}
