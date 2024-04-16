package com.guardiannestshop.backend.FunctionalAccessory;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class TokenUtil {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public static String generateToken(String userid, long expirationMillis) {
        Date now = new Date();

        Date expirationDate = new Date(now.getTime() + expirationMillis);
        String Data = userid;
        return Jwts.builder()
                .setSubject(Data)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}
