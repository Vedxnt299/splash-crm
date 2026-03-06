package com.crm.app.lead;

import com.crm.app.followup.FollowUpRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final LeadRepository leadRepository;
    private final FollowUpRepository followUpRepository;

    public DashboardController(LeadRepository leadRepository,
                               FollowUpRepository followUpRepository) {
        this.leadRepository = leadRepository;
        this.followUpRepository = followUpRepository;
    }

    @GetMapping("/summary")
    public Map<String, Long> getDashboardSummary() {

        Map<String, Long> summary = new HashMap<>();

        summary.put("TOTAL", leadRepository.count());
        summary.put("HOT", leadRepository.countByTemperature(LeadTemperature.HOT));
        summary.put("PROSPECT", leadRepository.countByTemperature(LeadTemperature.PROSPECT));
        summary.put("WARM", leadRepository.countByTemperature(LeadTemperature.WARM));
        summary.put("SMP", leadRepository.countByTemperature(LeadTemperature.SMP));

        long today = leadRepository.findByNextFollowUpDate(LocalDate.now()).size();
        long overdue = leadRepository.findByNextFollowUpDateBefore(LocalDate.now()).size();
        long upcoming = leadRepository.findByNextFollowUpDateAfter(LocalDate.now()).size();

        summary.put("FOLLOWUPS_TODAY", today);
        summary.put("FOLLOWUPS_OVERDUE", overdue);
        summary.put("FOLLOWUPS_UPCOMING", upcoming);

        return summary;
    }

    @GetMapping("/followups")
    public Map<String, List<Lead>> getFollowUpLeads() {

        Map<String, List<Lead>> data = new HashMap<>();

        data.put("today",
                leadRepository.findByNextFollowUpDate(LocalDate.now()));

        data.put("overdue",
                leadRepository.findByNextFollowUpDateBefore(LocalDate.now()));

        data.put("upcoming",
                leadRepository.findByNextFollowUpDateAfter(LocalDate.now()));

        return data;
    }
}