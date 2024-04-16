package com.guardiannestshop.backend.api.controller;

import com.guardiannestshop.backend.api.output.ProductOutput;
import com.guardiannestshop.backend.api.output.ReviewOutPut;
import com.guardiannestshop.backend.dto.ProductsDTO;
import com.guardiannestshop.backend.dto.ReviewDTO;
import com.guardiannestshop.backend.service.ReviewService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping( "/review/api")
public class ReViewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/admin/reviews-list")
    public ReviewOutPut getAll(@RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ReviewOutPut result = new ReviewOutPut();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(reviewService.getAll(pageable));
        result.setTotalPage((int) Math.ceil((double) (reviewService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }
    @GetMapping("/admin/reviews-list-by-userid/{userid}")
    public ReviewOutPut getbyUserId(@PathVariable String userid, @RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ReviewOutPut result = new ReviewOutPut();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(reviewService.getByUserid(userid,pageable));
        result.setTotalPage((int) Math.ceil((double) (reviewService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }

    @GetMapping("/admin/reviews-list-by-productsid/{productsid}")
    public ReviewOutPut getByProductid(@PathVariable Long productsid, @RequestParam("page") int page, @RequestParam("limit") int limit, Model model) {
        ReviewOutPut result = new ReviewOutPut();
        result.setPage(page);
        Pageable pageable =  PageRequest.of(page - 1, limit);
        result.setListResult(reviewService.getByProductsid(productsid,pageable));
        result.setTotalPage((int) Math.ceil((double) (reviewService.totalItem()) / limit));
        model.addAttribute("userAccountOutput", result);
        return result;
    }

    @PostMapping("/admin/create-review")
    public ResponseEntity<String> createReviews(@RequestBody ReviewDTO reviewDTO) {
        try {
            reviewService.createReview(reviewDTO);
            return new ResponseEntity<>("more success ", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/admin/update-review/{reviewid}")
    public ResponseEntity<String> createReview(@PathVariable Long reviewid,@RequestBody ReviewDTO reviewDTO) {
        try {
            reviewDTO.setReviewid(reviewid);
            reviewService.updateReview(reviewDTO);
            return new ResponseEntity<>("more success ", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @Transactional
    @DeleteMapping("/admin/delete-review/{reviewid}")
    public ResponseEntity<String> deleteReView(@PathVariable  Long reviewid) {
        try {
            reviewService.deleteByReviewid(reviewid);
            return new ResponseEntity<>("Xóa thành công", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
