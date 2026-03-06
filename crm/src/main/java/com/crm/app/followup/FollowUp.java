package com.crm.app.followup;

import com.crm.app.lead.Lead;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "followups")
public class FollowUp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // which lead this follow-up belongs to
    @ManyToOne
    @JoinColumn(name = "lead_id", nullable = false)
    private Lead lead;

    // what customer said
    @Column(length = 2000)
    private String note;

    // when to call again
    @Column(name = "next_followup_date")
    private LocalDate nextFollowUpDate;

    // when this follow-up was created
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // getters and setters

    public Long getId() {
        return id;
    }

    public Lead getLead() {
        return lead;
    }

    public void setLead(Lead lead) {
        this.lead = lead;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public LocalDate getNextFollowUpDate() {
        return nextFollowUpDate;
    }

    public void setNextFollowUpDate(LocalDate nextFollowUpDate) {
        this.nextFollowUpDate = nextFollowUpDate;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}