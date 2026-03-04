package com.crm.app.lead;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    Optional<Lead> findByPhoneNumber(String phoneNumber);

    long countByTemperature(LeadTemperature temperature);
}
