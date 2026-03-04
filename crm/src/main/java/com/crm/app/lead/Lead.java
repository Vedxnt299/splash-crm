package com.crm.app.lead;

import com.crm.app.user.User;
import jakarta.persistence.*;
import com.crm.app.user.User;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "leads",
        uniqueConstraints = @UniqueConstraint(columnNames = "phone_number")
)
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(optional = true)
    @JoinColumn(name = "assigned_user_id", nullable = true)
    private User assignedTo;


    private Long estimatedOrderValue;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    private String name;
    private String city;
    private String state;

    @Column(length = 1000)
    private String requirement;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LeadTemperature temperature = LeadTemperature.PROSPECT;

    @Enumerated(EnumType.STRING)
    private LeadStatus status = LeadStatus.NEW;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // getters & setters
    public Long getEstimatedOrderValue() {
        return estimatedOrderValue;
    }

    public void setEstimatedOrderValue(Long estimatedOrderValue) {
        this.estimatedOrderValue = estimatedOrderValue;
    }

    public LeadTemperature getTemperature() {
        return temperature;
    }

    public void setTemperature(LeadTemperature temperature) {
        this.temperature = temperature;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getRequirement() { return requirement; }
    public void setRequirement(String requirement) { this.requirement = requirement; }

    public LeadStatus getStatus() { return status; }
    public void setStatus(LeadStatus status) { this.status = status; }

    public User getAssignedTo() { return assignedTo; }
    public void setAssignedTo(User assignedTo) { this.assignedTo = assignedTo; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
