package com.crm.app.followup;

import com.crm.app.lead.Lead;
import com.crm.app.lead.LeadRepository;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/followups")
public class FollowUpController {

    private final FollowUpRepository followUpRepository;
    private final LeadRepository leadRepository;

    public FollowUpController(FollowUpRepository followUpRepository,
                              LeadRepository leadRepository) {
        this.followUpRepository = followUpRepository;
        this.leadRepository = leadRepository;
    }

    // Add follow-up after a call
    @PostMapping
    public FollowUp addFollowUp(@RequestBody FollowUpRequest request) {

        Lead lead = leadRepository.findById(request.leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        // Save follow-up history
        FollowUp followUp = new FollowUp();
        followUp.setLead(lead);
        followUp.setNote(request.note);
        followUp.setNextFollowUpDate(request.nextFollowUpDate);

        FollowUp savedFollowUp = followUpRepository.save(followUp);
        lead.setNextFollowUpDate(request.nextFollowUpDate);
        leadRepository.save(lead);


        // Update lead status
        if (request.status != null) {
            lead.setStatus(
                    com.crm.app.lead.LeadStatus.valueOf(request.status)
            );
            leadRepository.save(lead);
        }

        return savedFollowUp;
    }

    // Get follow-up history for a lead
    @GetMapping("/lead/{leadId}")
    public List<FollowUp> getFollowUps(@PathVariable Long leadId) {

        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        return followUpRepository.findByLeadOrderByCreatedAtDesc(lead);
    }

    @GetMapping("/today")
    public List<FollowUp> todayFollowUps() {
        return followUpRepository.findByNextFollowUpDate(LocalDate.now());
    }

    @GetMapping("/overdue")
    public List<FollowUp> overdueFollowUps() {
        return followUpRepository.findByNextFollowUpDateBefore(LocalDate.now());
    }

    @GetMapping("/upcoming")
    public List<FollowUp> upcomingFollowUps() {
        return followUpRepository.findByNextFollowUpDateAfter(LocalDate.now());
    }
}