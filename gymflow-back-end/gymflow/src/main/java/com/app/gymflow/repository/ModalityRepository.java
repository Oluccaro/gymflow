package com.app.gymflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.gymflow.model.Modality;

public interface ModalityRepository extends JpaRepository<Modality, Long>{
  Modality findByName(String name);
}
