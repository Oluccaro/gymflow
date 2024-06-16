package com.app.gymflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.gymflow.model.Student;

public interface StudentRepository extends JpaRepository<Student, Long>{
  Student findByPhone(String phone);
}
