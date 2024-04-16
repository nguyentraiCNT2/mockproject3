package com.guardiannestshop.backend.service.impl;


import com.guardiannestshop.backend.Mapper.Opject.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.entity.*;
import com.guardiannestshop.backend.repository.*;
import com.guardiannestshop.backend.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserIMPL implements UserService {
    @Value("D:/GuardianNestShopcode/templates/public/images/") // Đường dẫn để lưu ảnh, có thể đặt trong file properties/application.yml
    private String imageSavePath;
    @Autowired
    private final UserRepository userRepository;
    private UserMapper userMapper;
    private ModelMapper modelMapper;
    private RoleRepository roleRepository;
    public UserIMPL(UserRepository userRepository, UserMapper userMapper, ModelMapper modelMapper, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.modelMapper = modelMapper;
        this.roleRepository = roleRepository;
    }


    @Override
    public List<UserDTO> getAll(Pageable pageable) {
        List<UserDTO> results = new ArrayList<>();
        List<UserEntity> userEntities = userRepository.findAll(pageable).getContent();
        for (UserEntity item: userEntities
        ) {
            UserDTO userDTO = modelMapper.map(item,UserDTO.class);
            results.add(userDTO);
        }
        return results;
    }

    @Override
    public int totalItem() {
        return (int) userRepository.count();
    }

    @Override
    public UserDTO getByUserid(String userid) {
        try {
            UserEntity user = userRepository.findByUserid(userid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + userid));
            return modelMapper.map(user,UserDTO.class);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<UserDTO> getByUsername(String username,Pageable pageable) {
        List<UserDTO> results = new ArrayList<>();
        List<UserEntity> userEntities = userRepository.findByUsername(username,pageable);
        for (UserEntity item: userEntities
        ) {
            UserDTO userDTO = modelMapper.map(item,UserDTO.class);
            results.add(userDTO);
        }
        return results;
    }

    @Override
    public List<UserDTO> getByEmail(String email) {
        try {
            List<UserEntity> user  = userRepository.findByEmail(email);
            return user.stream()
                    .map(userMapper::maptoDTO)
                    .collect(Collectors.toList());
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public List<UserDTO> getByRoleid(Long roleid, Pageable pageable) {
        List<UserDTO> results = new ArrayList<>();
        RoleEntity roleEntity  = roleRepository.findByRoleid(roleid).orElse(null);
        List<UserEntity> userEntities = userRepository.findByRoleid(roleEntity,pageable);
        for (UserEntity item: userEntities
        ) {
            UserDTO userDTO = userMapper.maptoDTO(item);
            results.add(userDTO);
        }
        return results;
    }

    @Override
    public void deleteByUserid(String userid) {
        userRepository.deleteByUserid(userid);
    }

    @Override
    public void createUser(UserDTO userDTO) {
        if ( userDTO != null) {
            UserEntity user = userMapper.maptoEntity(userDTO);
            RoleEntity roleEntity = roleRepository.findByRoleid(userDTO.getRoleid()).orElse(null);
            if (user != null) {
                user.setRoleid(roleEntity);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Không lấy được dữ liệu của Entity");
            }
        }
    }

    private String moveTemporaryAvatarToFinalLocation(String temporaryImagePath) {
        // Chuyển ảnh từ thư mục tạm thời đến thư mục cuối cùng
        String finalFileName = "avatar_" + System.currentTimeMillis() + ".jpg";
        String finalFilePath = "/path/to/your/final/folder/" + finalFileName;

        // Di chuyển hoặc sao chép ảnh từ thư mục tạm thời đến thư mục cuối cùng
        // Cập nhật đường dẫn cuối cùng trong Entity

        // Trả về đường dẫn cuối cùng của ảnh
        return finalFilePath;
    }
    @Override
    public void updateUser(UserDTO userDTO) {
        UserEntity existingUser  = userRepository.findByUserid(userDTO.getUserid())
                .orElseThrow(() -> new RuntimeException("Khong tim thay du lieu User"));
        modelMapper.map(userDTO, existingUser);
        userRepository.save(existingUser);
    }
    @Override
    public void uploadImage(String userid, MultipartFile file) throws IOException {
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        if (user != null) {
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Lưu ảnh vào thư mục đã cấu hình
            String filePath = imageSavePath + filename;

            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

            // Lưu ảnh vào thu mục images hoặc lưu vào database nếu muốn
            // Đối với mục đích minh họa, ở đây tôi chỉ lưu tên file
            user.setImages(filename);
            userRepository.save(user);
        }
    }
}
