package com.crm.app.lead;

import com.crm.app.user.User;
import com.crm.app.user.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/leads")
public class LeadController {

    private final LeadRepository leadRepository;
    private final UserRepository userRepository;

    public LeadController(LeadRepository leadRepository,
                          UserRepository userRepository) {
        this.leadRepository = leadRepository;
        this.userRepository = userRepository;
    }

    /*
    =========================
    EXCEL IMPORT
    =========================
    */
    @PostMapping("/import")
    public String importLeads(@RequestParam("file") MultipartFile file) {

        try {

            InputStream is = file.getInputStream();
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheetAt(0);

            for (Row row : sheet) {

                if (row.getRowNum() == 0) continue; // skip header

                String name = getCell(row,0);
                String phone = getCell(row,1);
                String city = getCell(row,2);
                String estimatedValue = getCell(row,3);
                String status = getCell(row,4);
                String temperature = getCell(row,5);

                if (phone == null || phone.isBlank()) continue;

                // Skip duplicate phone
                if (leadRepository.findByPhoneNumber(phone).isPresent()) {
                    continue;
                }

                Lead lead = new Lead();

                lead.setName(name == null || name.isBlank() ? "-" : name.trim());
                lead.setPhoneNumber(phone.trim());
                lead.setCity(city == null || city.isBlank() ? "-" : city.trim());

                if (estimatedValue != null && !estimatedValue.isBlank()) {
                    lead.setEstimatedOrderValue(Long.parseLong(estimatedValue.trim()));
                }

                // status
                if (status != null && !status.isBlank()) {
                    try {
                        lead.setStatus(
                                LeadStatus.valueOf(status.trim().toUpperCase())
                        );
                    } catch (Exception ignored) {}
                }

                // temperature
                if (temperature != null && !temperature.isBlank()) {
                    try {
                        lead.setTemperature(
                                LeadTemperature.valueOf(temperature.trim().toUpperCase())
                        );
                    } catch (Exception ignored) {}
                }

                // assignedTo always null for excel import
                lead.setAssignedTo(null);

                leadRepository.save(lead);
            }

            workbook.close();

            return "Leads imported successfully";

        } catch (Exception e) {
            e.printStackTrace();
            return "Import failed";
        }
    }

    /*
    =========================
    GET ALL LEADS
    =========================
    */
    @GetMapping
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    /*
    =========================
    CREATE LEAD
    =========================
    */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Lead createLead(@RequestBody Lead lead) {

        leadRepository.findByPhoneNumber(lead.getPhoneNumber())
                .ifPresent(existing -> {
                    throw new RuntimeException("Lead already exists with this phone number");
                });

        if (lead.getAssignedTo() != null && lead.getAssignedTo().getId() != null) {

            User user = userRepository.findById(lead.getAssignedTo().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            lead.setAssignedTo(user);
        }

        return leadRepository.save(lead);
    }

    /*
    =========================
    DELETE LEAD
    =========================
    */
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable Long id) {
        leadRepository.deleteById(id);
    }

    /*
    =========================
    HELPER METHOD FOR EXCEL
    =========================
    */
    private String getCell(Row row, int index) {

        Cell cell = row.getCell(index);

        if (cell == null) return null;

        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();

            case NUMERIC:
                return String.valueOf((long)cell.getNumericCellValue());

            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());

            default:
                return null;
        }
    }
}