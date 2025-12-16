package com.traffic.service;

import com.traffic.model.VehicleFine;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FineService {

    private static List<VehicleFine> fines = new ArrayList<>();
    private static Long idCounter = 1L;

    static {
        fines.add(new VehicleFine(idCounter++, "KA01AB1234", "Speeding", 500.0, "2024-01-15", "UNPAID"));
        fines.add(new VehicleFine(idCounter++, "KA02CD5678", "Signal Jump", 1000.0, "2024-01-16", "PAID"));
        fines.add(new VehicleFine(idCounter++, "KA01AB1234", "No Helmet", 300.0, "2024-01-17", "UNPAID"));
        fines.add(new VehicleFine(idCounter++, "MH12XY9999", "Wrong Parking", 200.0, "2024-01-18", "UNPAID"));
        fines.add(new VehicleFine(idCounter++, "DL05EF4321", "Drunk Driving", 10000.0, "2024-01-19", "UNPAID"));
    }

    public VehicleFine addFine(VehicleFine fine) {
        fine.setId(idCounter++);
        fine.setVehicleNumber(fine.getVehicleNumber().toUpperCase());
        fines.add(fine);
        return fine;
    }

    public List<VehicleFine> getAllFines() {
        return new ArrayList<>(fines);
    }

    public List<VehicleFine> getFinesByVehicleNumber(String vehicleNumber) {
        return fines.stream()
                .filter(fine -> fine.getVehicleNumber().equalsIgnoreCase(vehicleNumber))
                .collect(Collectors.toList());
    }

    public VehicleFine payFine(Long id) {
        for (VehicleFine fine : fines) {
            if (fine.getId().equals(id)) {
                fine.setPaymentStatus("PAID");
                return fine;
            }
        }
        return null;
    }

    public boolean deleteFine(Long id) {
        return fines.removeIf(fine -> fine.getId().equals(id));
    }

    public VehicleFine getFineById(Long id) {
        return fines.stream()
                .filter(fine -> fine.getId().equals(id))
                .findFirst()
                .orElse(null);
    }
}
