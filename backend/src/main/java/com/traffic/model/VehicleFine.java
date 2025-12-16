package com.traffic.model;

public class VehicleFine {

    private Long id;
    private String vehicleNumber;
    private String violationType;
    private double fineAmount;
    private String date;
    private String paymentStatus;

    public VehicleFine() {}

    public VehicleFine(Long id, String vehicleNumber, String violationType,
                       double fineAmount, String date, String paymentStatus) {
        this.id = id;
        this.vehicleNumber = vehicleNumber;
        this.violationType = violationType;
        this.fineAmount = fineAmount;
        this.date = date;
        this.paymentStatus = paymentStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getViolationType() {
        return violationType;
    }

    public void setViolationType(String violationType) {
        this.violationType = violationType;
    }

    public double getFineAmount() {
        return fineAmount;
    }

    public void setFineAmount(double fineAmount) {
        this.fineAmount = fineAmount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    @Override
    public String toString() {
        return "VehicleFine{" +
                "id=" + id +
                ", vehicleNumber='" + vehicleNumber + '\'' +
                ", violationType='" + violationType + '\'' +
                ", fineAmount=" + fineAmount +
                ", date='" + date + '\'' +
                ", paymentStatus='" + paymentStatus + '\'' +
                '}';
    }
}
