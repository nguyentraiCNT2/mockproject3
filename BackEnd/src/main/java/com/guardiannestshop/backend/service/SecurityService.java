package com.guardiannestshop.backend.service;

import com.guardiannestshop.backend.dto.*;
import org.springframework.data.domain.Pageable;

import javax.mail.MessagingException;
import java.util.List;

public interface SecurityService {
    UserDTO signinAdmin(String username, String password);
    UserDTO signinUser(String username, String password);
    List<UserDTO> getByStatus(Boolean status);
    UserDTO getByMkc2(String userid, String Mkc2);
    UserDTO reSendEmail(String userid, String Mkc2) throws MessagingException;
    void signup(UserDTO userDTO );
    UserDTO profile(String userid);
    UserDTO forgotPassword(String username, String email);

}
