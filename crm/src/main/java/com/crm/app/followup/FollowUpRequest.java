package com.crm.app.followup;

import java.time.LocalDate;

public class FollowUpRequest {

    public Long leadId;

    public String note;

    public LocalDate nextFollowUpDate;

    public String status;   // NEW / IN_PROGRESS / SUCCESS / CLOSED

}