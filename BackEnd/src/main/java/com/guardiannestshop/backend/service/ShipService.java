package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ShipService {
    List<ShipDTO> getAll(Pageable pageable);
    int totalItem();
    ShipDTO getByShipid(Long shipid);
    List<ShipDTO> getByShipname(String shipname, Pageable pageable);
    void deleteByShipid(Long shipid);
    void createShip(ShipDTO shipDTO);
    void updateShip(ShipDTO shipDTO);
}
