package com.crm.app.lead;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    Optional<Lead> findByPhoneNumber(String phoneNumber);

    long countByTemperature(LeadTemperature temperature);

    List<Lead> findByNextFollowUpDate(LocalDate date);

    List<Lead> findByNextFollowUpDateBefore(LocalDate date);

    List<Lead> findByNextFollowUpDateAfter(LocalDate date);
}
