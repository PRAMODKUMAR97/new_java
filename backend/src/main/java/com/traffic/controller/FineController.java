package com.traffic.controller;

import com.traffic.model.VehicleFine;
import com.traffic.service.FineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fines")
@CrossOrigin(origins = "*")
public class FineController {

    @Autowired
    private FineService fineService;

    @PostMapping("/add")
    public ResponseEntity<VehicleFine> addFine(@RequestBody VehicleFine fine) {
        VehicleFine savedFine = fineService.addFine(fine);
        return ResponseEntity.ok(savedFine);
    }

    @GetMapping
    public ResponseEntity<List<VehicleFine>> getAllFines() {
        List<VehicleFine> fines = fineService.getAllFines();
        return ResponseEntity.ok(fines);
    }

    @GetMapping("/vehicle/{vehicleNumber}")
    public ResponseEntity<List<VehicleFine>> getFinesByVehicle(@PathVariable String vehicleNumber) {
        List<VehicleFine> fines = fineService.getFinesByVehicleNumber(vehicleNumber);
        return ResponseEntity.ok(fines);
    }

    @PutMapping("/pay/{id}")
    public ResponseEntity<VehicleFine> payFine(@PathVariable Long id) {
        VehicleFine updatedFine = fineService.payFine(id);
        if (updatedFine != null) {
            return ResponseEntity.ok(updatedFine);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFine(@PathVariable Long id) {
        boolean deleted = fineService.deleteFine(id);
        if (deleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
