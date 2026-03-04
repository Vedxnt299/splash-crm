package com.crm.app.lead;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final LeadRepository leadRepository;

    public DashboardController(LeadRepository leadRepository) {
        this.leadRepository = leadRepository;
    }

    @GetMapping("/summary")
    public Map<String, Long> getDashboardSummary() {

        Map<String, Long> summary = new HashMap<>();

        summary.put("TOTAL", leadRepository.count());
        summary.put("HOT", leadRepository.countByTemperature(LeadTemperature.HOT));
        summary.put("PROSPECT", leadRepository.countByTemperature(LeadTemperature.PROSPECT));
        summary.put("WARM", leadRepository.countByTemperature(LeadTemperature.WARM));
        summary.put("SMP", leadRepository.countByTemperature(LeadTemperature.SMP));

        return summary;
    }
}
