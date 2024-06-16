package com.app.gymflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.gymflow.model.Deal;

public interface DealRepository extends JpaRepository<Deal, Long>{
}
