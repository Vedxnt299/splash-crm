package com.crm.app.followup;

import com.crm.app.lead.Lead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {

    List<FollowUp> findByLeadOrderByCreatedAtDesc(Lead lead);

    // follow-ups due today
    List<FollowUp> findByNextFollowUpDate(LocalDate date);

    // overdue follow-ups
    List<FollowUp> findByNextFollowUpDateBefore(LocalDate date);

    // upcoming follow-ups
    List<FollowUp> findByNextFollowUpDateAfter(LocalDate date);
}