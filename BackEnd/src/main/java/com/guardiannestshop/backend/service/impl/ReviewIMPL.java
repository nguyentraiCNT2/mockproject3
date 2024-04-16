package com.guardiannestshop.backend.service.impl;

import com.guardiannestshop.backend.Mapper.Opject.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.entity.*;
import com.guardiannestshop.backend.repository.*;
import com.guardiannestshop.backend.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class ReviewIMPL implements ReviewService {
    @Autowired
    private final ReviewRepository reviewRepository;
    private ModelMapper modelMapper;
    private ReveiwMapper reveiwMapper;
    private UserRepository userRepository;
    private ProductsRepository productsRepository;

    public ReviewIMPL(ReviewRepository reviewRepository, ModelMapper modelMapper, ReveiwMapper reveiwMapper, UserRepository userRepository, ProductsRepository productsRepository) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
        this.reveiwMapper = reveiwMapper;
        this.userRepository = userRepository;
        this.productsRepository = productsRepository;
    }

    @Override
    public List<ReviewDTO> getAll(Pageable pageable) {
        List<ReviewDTO> results = new ArrayList<>();
        List<ReviewEntity> reviewEntities = reviewRepository.findAll(pageable).getContent();
        for (ReviewEntity item: reviewEntities
        ) {
            ReviewDTO DTO = reveiwMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) reviewRepository.count();
    }

    @Override
    public ReviewDTO getByReviewid(Long reviewid) {
        try {
            ReviewEntity review = reviewRepository.findByReviewid(reviewid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + reviewid));
            return reveiwMapper.maptoDTO(review);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<ReviewDTO> getByUserid(String userid, Pageable pageable) {
        List<ReviewDTO> results = new ArrayList<>();
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        List<ReviewEntity> reviewEntities = reviewRepository.findByUserid(user,pageable);
        for (ReviewEntity item: reviewEntities
        ) {
            ReviewDTO DTO = reveiwMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<ReviewDTO> getByProductsid(Long productsid, Pageable pageable) {
        List<ReviewDTO> results = new ArrayList<>();
        ProductsEntity products = productsRepository.findByProductsid(productsid).orElse(null);
        List<ReviewEntity> reviewEntities = reviewRepository.findByProductsid(products,pageable);
        Collections.sort(reviewEntities, Comparator.comparing(ReviewEntity::getReviewid).reversed());
        for (ReviewEntity item: reviewEntities
        ) {
            ReviewDTO DTO = reveiwMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public List<ReviewDTO> getByEvaluate(Long evaluate, Pageable pageable) {
        List<ReviewDTO> results = new ArrayList<>();
        List<ReviewEntity> reviewEntities = reviewRepository.findByEvaluate(evaluate,pageable);
        for (ReviewEntity item: reviewEntities
        ) {
            ReviewDTO DTO = reveiwMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public void deleteByReviewid(Long reviewid) {
        reviewRepository.deleteByReviewid(reviewid);
    }

    @Override
    public void createReview(ReviewDTO reviewDTO) {
        if ( reviewDTO != null) {
            ReviewEntity review = reveiwMapper.maptoEntity(reviewDTO);
            UserEntity user = userRepository.findByUserid(reviewDTO.getUserid()).orElse(null);
            ProductsEntity products = productsRepository.findByProductsid(reviewDTO.getProductsid()).orElse(null);
            if (review != null) {
                review.setUserid(user);
                review.setProductsid(products);
                reviewRepository.save(review);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateReview(ReviewDTO reviewDTO) {
        ReviewEntity existingReview  = reviewRepository.findByReviewid(reviewDTO.getReviewid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(reviewDTO, existingReview);
        reviewRepository.save(existingReview);
    }
}
