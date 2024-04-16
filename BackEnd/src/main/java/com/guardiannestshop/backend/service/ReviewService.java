package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ReviewService{
    List<ReviewDTO> getAll(Pageable pageable);
    int totalItem();
    ReviewDTO getByReviewid(Long reviewid);
    List<ReviewDTO> getByUserid(String userid, Pageable pageable);
    List<ReviewDTO> getByProductsid(Long productsid, Pageable pageable);
    List<ReviewDTO> getByEvaluate(Long evaluate, Pageable pageable);
    void deleteByReviewid(Long reviewid);
    void createReview(ReviewDTO reviewDTO);
    void updateReview(ReviewDTO reviewDTO);
}
