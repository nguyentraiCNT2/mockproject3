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
import java.util.List;

@Service
public class ImportdetailsIMPL implements ImportdetailsService {
    @Autowired
    private final   ImportdetailsRepository importdetailsRepository;
    private ModelMapper modelMapper;
    private ImportdetailsMapper importdetailsMapper;
    private ProductsRepository productsRepository;

    public ImportdetailsIMPL(ImportdetailsRepository importdetailsRepository, ModelMapper modelMapper, ImportdetailsMapper importdetailsMapper, ProductsRepository productsRepository) {
        this.importdetailsRepository = importdetailsRepository;
        this.modelMapper = modelMapper;
        this.importdetailsMapper = importdetailsMapper;
        this.productsRepository = productsRepository;
    }


    @Override
    public List<ImportdetailsDTO> getAll(Pageable pageable) {
        List<ImportdetailsDTO> results = new ArrayList<>();
        List<ImportdetailsEntity> importdetailsEntities = importdetailsRepository.findAll(pageable).getContent();
        for (ImportdetailsEntity item: importdetailsEntities
        ) {
            ImportdetailsDTO DTO = importdetailsMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int)importdetailsRepository.count();
    }

    @Override
    public ImportdetailsDTO getByImportdetailsid(Long importdetailsid) {
        try {
            ImportdetailsEntity importdetailsEntity = importdetailsRepository.findByImportdetailsid(importdetailsid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + importdetailsid));
            return importdetailsMapper.maptoDTO(importdetailsEntity);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<ImportdetailsDTO> getByProductsid(Long productsid, Pageable pageable) {
        List<ImportdetailsDTO> results = new ArrayList<>();
        List<ImportdetailsEntity> importdetailsEntities = importdetailsRepository.findByProductsid(productsid,pageable);
        for (ImportdetailsEntity item: importdetailsEntities
        ) {
            ImportdetailsDTO DTO = importdetailsMapper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public void deleteByImportdetailsid(Long importdetailsid) {
        importdetailsRepository.deleteByImportdetailsid(importdetailsid);
    }

    @Override
    public void createImportdetails(ImportdetailsDTO importdetailsDTO) {
        if ( importdetailsDTO != null) {
            ImportdetailsEntity importdetails = modelMapper.map(importdetailsDTO,ImportdetailsEntity.class );
            ProductsEntity products = productsRepository.findByProductsid(importdetailsDTO.getProductsid()).orElse(null);
            if (importdetails != null && products != null) {
                importdetails.setProductsid(products);
                products.setProductprice(importdetails.getImportprice());
                products.setProductsqltk(products.getProductsqltk() + importdetails.getImportqty());
                importdetailsRepository.save(importdetails);
                productsRepository.save(products);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }
    @Override
    public void updateImportdetails(ImportdetailsDTO importdetailsDTO) {
        ImportdetailsEntity existingImportdetails  = importdetailsRepository.findByImportdetailsid(importdetailsDTO.getImportdetailsid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(importdetailsDTO, existingImportdetails);
        importdetailsRepository.save(existingImportdetails);
    }
}
