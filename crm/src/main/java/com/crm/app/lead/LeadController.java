package com.crm.app.lead;

import com.crm.app.user.User;
import com.crm.app.user.UserRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    // Any logged-in user can view leads
    @GetMapping
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    // ADMIN only
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

    // ADMIN only
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteLead(@PathVariable Long id) {
        leadRepository.deleteById(id);
    }
}