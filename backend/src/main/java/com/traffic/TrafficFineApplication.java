package com.traffic;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TrafficFineApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrafficFineApplication.class, args);
        System.out.println("========================================");
        System.out.println("Traffic Fine Management System Started!");
        System.out.println("Server running at: http://localhost:8080");
        System.out.println("========================================");
    }
}