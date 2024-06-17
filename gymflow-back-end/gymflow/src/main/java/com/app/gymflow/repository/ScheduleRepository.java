package com.app.gymflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.gymflow.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>{
}
