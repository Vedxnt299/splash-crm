package com.crm.app.lead;

public record LeadUpdateRequest(
        String name,
        String city,
        LeadTemperature temperature,
        Long estimatedOrderValue,
        Long assignedUserId
) {}
