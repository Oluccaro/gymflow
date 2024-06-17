package com.app.gymflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.gymflow.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long>{
}
