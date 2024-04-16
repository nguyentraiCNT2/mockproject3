package com.guardiannestshop.backend.api.controller;

import com.guardiannestshop.backend.FunctionalAccessory.RandomId;
import com.guardiannestshop.backend.FunctionalAccessory.TokenUtil;
import com.guardiannestshop.backend.api.output.*;
import com.guardiannestshop.backend.dto.*;
import com.guardiannestshop.backend.service.*;
import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/security")
public class SecurityController {
    @Autowired
    private final SecurityService securityService;

    public SecurityController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @PostMapping("/admin/signin")
    public ResponseEntity<?> signinAdmin(  String username, @RequestParam String password) {
        try {
            UserDTO userDTO = securityService.signinAdmin(username, password);
            Date date  = new Date();
            long expirationMillis = 3600000;
            String mainToken = TokenUtil.generateToken(userDTO.getUserid(), expirationMillis);
            Map<String, Object> response = new HashMap<>();
            Cookie cookie = new Cookie("token", mainToken);
            String role = "User";
            cookie.setHttpOnly(true);
            cookie.setMaxAge(3600000);
            cookie.setPath("/");
           response.put("token",mainToken);
            response.put("role",role);
            response.put("userid",userDTO.getUserid());
             return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/user/signin")
    public ResponseEntity<?> signinUser(@RequestParam String username, @RequestParam String password) {
        try {

            UserDTO userDTO = securityService.signinUser(username, password);
            Date date  = new Date();
            long expirationMillis = 3600000;
            String mainToken = TokenUtil.generateToken(userDTO.getUserid(), expirationMillis);
            Map<String, Object> response = new HashMap<>();
            Cookie cookie = new Cookie("token", mainToken);
            String role = "User";
            cookie.setHttpOnly(true);
            cookie.setMaxAge(3600000);
            cookie.setPath("/");
            response.put("token",mainToken);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO) {
        try {
            String randomId = RandomId.generateRandomId(30);
            String MKC2 = RandomId.generateMKC2(10);
            userDTO.setMkc2(MKC2);
            userDTO.setUserid(randomId);
            userDTO.setRoleid(2L  );
            userDTO.setStatus(true);
            securityService.signup(userDTO);
            Date date  = new Date();
            long expirationMillis = 3600000;
            String mainToken = TokenUtil.generateToken(userDTO.getUserid(), expirationMillis);
            Map<String, Object> response = new HashMap<>();
            Cookie cookie = new Cookie("token", mainToken);
            cookie.setHttpOnly(true);
            cookie.setMaxAge(3600000);
            cookie.setPath("/");
            response.put("token",mainToken);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/profile/user/{userid}")
    public ResponseEntity<?> profileUser(@PathVariable String userid) {
        try {
            UserDTO userDTO = securityService.profile(userid);
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/profile/admin/{userid}")
    public ResponseEntity<?> profileAdmin(@PathVariable String userid) {
        try {
            UserDTO userDTO = securityService.profile(userid);
            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/admin/user-by-status/{status}")
    public ResponseEntity<?> getByStatus(@PathVariable Boolean status) {
        try {
            List<UserDTO> userDTO = securityService.getByStatus(status);

            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admin/check-core/{userid}")
    public ResponseEntity<?> getByCheckcore(@PathVariable String userid,@RequestParam("Mkc2") String Mkc2) {
        try {
            UserDTO userDTO = securityService.getByMkc2(userid,Mkc2);

            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/admin/resend-email/{userid}")
    public ResponseEntity<?> getByReSendEmail(@PathVariable String userid,@RequestParam("Mkc2") String Mkc2) {
        try {
            UserDTO userDTO = securityService.reSendEmail(userid,Mkc2);

            return new ResponseEntity<>(userDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>((List<UserDTO>) null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("/for-got-password")
    public ResponseEntity<?> forGotPassword(@RequestParam String username, @RequestParam String email) {
        try {

            UserDTO userDTO = securityService.forgotPassword(username, email);
            Date date  = new Date();
            long expirationMillis = 3600000;
            String mainToken = TokenUtil.generateToken(userDTO.getUserid(), expirationMillis);
            Map<String, Object> response = new HashMap<>();
            Cookie cookie = new Cookie("token", mainToken);
            String role = "User";
            cookie.setHttpOnly(true);
            cookie.setMaxAge(3600000);
            cookie.setPath("/");
            response.put("token",mainToken);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

}
