package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ColorService {
    List<ColorDTO> getAll(Pageable pageable);
    int totalItem();
 ColorDTO getByColorid(Long colorid);
    List<ColorDTO> getByColorname(String colorname, Pageable pageable);
    void deleteByColorid(Long colorid);
    void createColor(ColorDTO colorDTO);
    void updateColor(ColorDTO colorDTO);
}
