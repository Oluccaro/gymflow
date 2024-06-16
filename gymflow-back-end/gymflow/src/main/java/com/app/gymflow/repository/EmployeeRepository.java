package com.app.gymflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.gymflow.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{
  Employee findByPhone(String phone);
}
