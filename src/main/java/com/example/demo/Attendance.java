package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "attendance")
@CompoundIndex(name = "employee_date", def = "{'employeeId': 1, 'date': 1}", unique = true)
public class Attendance {

    @Id
    private String id;

    private String employeeId;

    private LocalDate date;

    private LocalDateTime signInTime;

    private LocalDateTime signOutTime;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Attendance() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public Attendance(String employeeId, LocalDate date) {
        this.employeeId = employeeId;
        this.date = date;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public LocalDateTime getSignInTime() { return signInTime; }
    public void setSignInTime(LocalDateTime signInTime) { this.signInTime = signInTime; }

    public LocalDateTime getSignOutTime() { return signOutTime; }
    public void setSignOutTime(LocalDateTime signOutTime) { this.signOutTime = signOutTime; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
