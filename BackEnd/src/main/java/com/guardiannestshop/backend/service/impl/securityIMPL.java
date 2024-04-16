package com.guardiannestshop.backend.service.impl;

import com.guardiannestshop.backend.FunctionalAccessory.RandomId;
import com.guardiannestshop.backend.FunctionalAccessory.SendCodeByEmail;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.entity.*;
import com.guardiannestshop.backend.repository.*;
import com.guardiannestshop.backend.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class securityIMPL implements SecurityService {
    @Autowired
    private final UserRepository userRepository;
    private RoleRepository roleRepository;
    private ModelMapper modelMapper;
    private SecurityRepository securityRepository;
    private UserEntity userEntity;

    public securityIMPL(UserRepository userRepository, RoleRepository roleRepository, ModelMapper modelMapper, SecurityRepository securityRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.modelMapper = modelMapper;
        this.securityRepository = securityRepository;

    }


    @Override
    public UserDTO signinAdmin(String username, String password) {
        List<UserEntity> userEntityList = securityRepository.findByUsername(username);

        if (userEntityList.size() == 0) {
            throw new RuntimeException("tai khoan nay  khong ton tai");
        }
        for (UserEntity item : userEntityList
        ) {
            if (item.getPassword().equals(password)) {
                if (item.getRoleid().getRolename().equals("admin")) {
                    item.setStatus(true);
                    userRepository.save(item);
                    UserDTO userDTO = modelMapper.map(item, UserDTO.class);
                    return userDTO;
                } else {
                    throw new RuntimeException("tai khoan nay khong ton tai");
                }
            }
        }

        throw new RuntimeException("Mật khẩu không đúng");
    }

    @Override
    public UserDTO signinUser(String username, String password) {
        List<UserEntity> userEntityList = securityRepository.findByUsername(username);

        if (userEntityList.size() == 0) {
            throw new RuntimeException("tai khoan nay  khong ton tai");
        }
        for (UserEntity item : userEntityList
        ) {
            if (item.getPassword().equals(password)) {
                if (item.getRoleid().getRolename().equals("user")) {
                    item.setStatus(true);
                    userRepository.save(item);
                    UserDTO userDTO = modelMapper.map(item, UserDTO.class);
                    return userDTO;
                } else {
                    throw new RuntimeException("tai khoan nay khong ton tai");
                }
            }
        }

        throw new RuntimeException("Mật khẩu không đúng");
    }

    @Override
    public List<UserDTO> getByStatus(Boolean status) {
        List<UserDTO> results = new ArrayList<>();
        List<UserEntity> userEntities = userRepository.findByStatus(status);
        for (UserEntity item : userEntities
        ) {
            UserDTO userDTO = modelMapper.map(item, UserDTO.class);
            results.add(userDTO);
        }
        return results;
    }

    @Override
    public UserDTO getByMkc2(String userid, String Mkc2) {

        if (!userEntity.getMkc2().equals(Mkc2)) {
            throw new RuntimeException("Mã xác thực không đúng");
        }
        userRepository.save(userEntity);
        UserDTO dto = modelMapper.map(userEntity, UserDTO.class);
        return dto;
    }

    @Override
    public UserDTO reSendEmail(String userid, String Mkc2) throws MessagingException {
        UserEntity user = userRepository.findByUserid(userid).orElse(null);
        String MKC2 = RandomId.generateMKC2(8);
        String to = user.getEmail();
        String subject = "Xác thực email đăng ký ";
        String name = "Xin chào " + user.getFirtname() + " " + user.getLastname();
        String email = "Có email là: " + user.getEmail();
        String core = "Đây là mã xác thực của bạn: " + MKC2;
        String bottom = "Xin cảm ơn";
        String body = name + ". \n" + email + ". \n" + core + ". \n" + bottom;
        Boolean test = SendCodeByEmail.sendEmail(to, subject, body);
        if (test == true && user != null) {
            user.setMkc2(MKC2);
            UserEntity usersave = userRepository.save(user);
            UserDTO userDTO = modelMapper.map(usersave, UserDTO.class);
            return userDTO;
        } else {
            throw new RuntimeException("Email không tồn tại.");
        }


    }

    @Override
    public void signup(UserDTO userDTO) {
        if (userDTO != null) {
            List<UserEntity> userEntityList = securityRepository.findByUsername(userDTO.getUsername());
            Map<String, Object> response = new HashMap<>();
            if (userEntityList.size() != 0) {
                throw new RuntimeException("tai khoan nay da ton tai");
            }
            if (userDTO.getPassword().length() < 6) {
                throw new RuntimeException("may khau toi thieu la 6 ki tu");
            } else if (userDTO.getPassword().length() > 20) {
                throw new RuntimeException("may khau toi da la 20 ki tu");
            } else if (userDTO.getPassword().contains(" ")) {
                throw new RuntimeException("may khau khong the chua ky tu trang");
            } else if (userDTO.getPassword().equals(userDTO.getUsername())) {
                throw new RuntimeException("may khau khong the chua ten dang nhap");
            }
            try {
                String MKC2 = RandomId.generateMKC2(8);
                String to = userDTO.getEmail();
                String subject = "Xác thực email đăng ký ";
                String name = "Xin chào " + userDTO.getFirtname() + " " + userDTO.getLastname();
                String email = "Có email là: " + userDTO.getEmail();
                String core = "Đây là mã xác thực của bạn: " + MKC2;
                String bottom = "Xin cảm ơn";
                String body = name + ". \n" + email + ". \n" + core + ". \n" + bottom;
                Boolean test = SendCodeByEmail.sendEmail(to, subject, body);
                if (test == true) {
                    UserEntity user = modelMapper.map(userDTO, UserEntity.class);
                    RoleEntity roleEntity = roleRepository.findByRoleid(userDTO.getRoleid()).orElse(null);
                    if (user != null) {
                        user.setMkc2(MKC2);
                        user.setRoleid(roleEntity);
                        userEntity = user;
                    } else {
                        throw new RuntimeException("Không lấy được dữ liệu của Entity");
                    }
                } else {
                    throw new RuntimeException("Email không tồn tại.");
                }
            } catch (MessagingException e) {
                e.printStackTrace();
            }


        }
    }

    @Override
    public UserDTO profile(String userid) {
        try {
            UserEntity user = userRepository.findByUserid(userid)
                    .orElseThrow(() -> new EntityNotFoundException("Data not found with ID: " + userid));
            return modelMapper.map(user, UserDTO.class);
        } catch (EntityNotFoundException ex) {
            throw ex;
        } catch (Exception e) {
            throw new RuntimeException("An error occurred while fetching data by ID", e);
        }
    }

    @Override
    public UserDTO forgotPassword(String username, String email) {
        List<UserEntity> userEntityList = userRepository.findByUsername(username);
        UserDTO dto = new UserDTO();
        for (UserEntity item : userEntityList
        ) {
            try {
                if (item.getEmail().equals(email)) {
                    String MKC2 = RandomId.generateMKC2(8);
                    String to = item.getEmail();
                    String subject = "Xác thực email đăng ký ";
                    String name = "Xin chào " + item.getFirtname() + " " + item.getLastname();
                    String Sendemail = "Có email là: " + item.getEmail();
                    String core = "Đây là mã xác thực của bạn: " + MKC2;
                    String bottom = "Xin cảm ơn";
                    String body = name + ". \n" + Sendemail + ". \n" + core + ". \n" + bottom;
                    Boolean test = SendCodeByEmail.sendEmail(to, subject, body);
                    if (test == true) {
                        if (item != null) {
                            item.setMkc2(MKC2);
                            userEntity = item;
                            dto = modelMapper.map(item, UserDTO.class);
                        } else {
                            throw new RuntimeException("Không lấy được dữ liệu của Entity");
                        }
                    } else {
                        throw new RuntimeException("Email không tồn tại.");
                    }
                }
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
        return dto;
    }
}
