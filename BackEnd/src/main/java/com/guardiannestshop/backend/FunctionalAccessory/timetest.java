package com.guardiannestshop.backend.FunctionalAccessory;

import java.sql.Time;

public class timetest {
    public static void main(String[] args) {
        Time time = new Time(0);
        time.setHours(1);
        time.setMinutes(0);
        time.setSeconds(0);
        System.out.println(" time = "+time);
    }
}
