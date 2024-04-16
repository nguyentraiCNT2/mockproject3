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
public class ColorIMPL implements ColorService {
    @Autowired
    private final ColorRepository colorRepository;
    private ModelMapper modelMapper;
    private ColorMappper colorMappper;

    public ColorIMPL(ColorRepository colorRepository, ModelMapper modelMapper, ColorMappper colorMappper) {
        this.colorRepository = colorRepository;
        this.modelMapper = modelMapper;
        this.colorMappper = colorMappper;
    }


    @Override
    public List<ColorDTO> getAll(Pageable pageable) {
        List<ColorDTO> results = new ArrayList<>();
        List<ColorEntity> customersEntities = colorRepository.findAll(pageable).getContent();
        for (ColorEntity item: customersEntities
        ) {
            ColorDTO DTO = colorMappper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) colorRepository.count();
    }

    @Override
    public ColorDTO getByColorid(Long colorid) {
        try {
            ColorEntity color = colorRepository.findByColorid(colorid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + colorid));
            return colorMappper.maptoDTO(color);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<ColorDTO> getByColorname(String colorname, Pageable pageable) {
        List<ColorDTO> results = new ArrayList<>();
        List<ColorEntity> customersEntities = colorRepository.findByColorname(colorname,pageable);
        for (ColorEntity item: customersEntities
        ) {
            ColorDTO DTO = colorMappper.maptoDTO(item);
            results.add(DTO);
        }
        return results;
    }
    @Override
    public void deleteByColorid(Long colorid) {
        colorRepository.deleteByColorid(colorid);
    }

    @Override
    public void createColor(ColorDTO colorDTO) {
        if ( colorDTO != null) {
            ColorEntity color = colorMappper.maptoEntity(colorDTO);
            if (color != null) {
                colorRepository.save(color);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    @Override
    public void updateColor(ColorDTO colorDTO) {
        ColorEntity existingColor  = colorRepository.findByColorid(colorDTO.getColorid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(colorDTO, existingColor);
        colorRepository.save(existingColor);
    }
}
