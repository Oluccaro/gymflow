package com.app.gymflow.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.dto.EmployeeDTO;
import com.app.gymflow.model.Employee;
import com.app.gymflow.repository.EmployeeRepository;

@Service
public class EmployeeService {
  
  @Autowired
  private EmployeeRepository employeeRepository;

  @Autowired
  private ModelMapper mapper;

  public EmployeeDTO createEmployee(EmployeeDTO employeeDTO){

    if(employeeRepository.findByPhone(employeeDTO.getPhone()) != null){
      throw new IllegalArgumentException("User with phone" + employeeDTO.getPhone() + "already exists");
    }
    
    Employee employee = mapper.map(employeeDTO, Employee.class);
    employee = employeeRepository.save(employee);
    return mapper.map(employee, EmployeeDTO.class);
    
  }

  public Optional<EmployeeDTO> getEmployee(Long employeeId){
    Optional<Employee> employee = employeeRepository.findById(employeeId);
    if(employee.isPresent()){
      return Optional.of(mapper.map(employee, EmployeeDTO.class));
    }
    return Optional.empty();
  }

  public Optional<EmployeeDTO> updateEmployee(Long employeeId, EmployeeDTO employeeDTO){
    Optional<Employee> optEmployee = employeeRepository.findById(employeeId);
    if(optEmployee.isPresent()){
      Employee employee = optEmployee.get();
      employee.setBirthDate(employeeDTO.getBirthDate());
      employee.setName(employeeDTO.getName());
      employee.setPhone(employeeDTO.getPhone());
      employee.setHeight(employeeDTO.getHeight());
      employee.setSex(employeeDTO.getSex());
      employee.setWeight(employeeDTO.getWeight());
      employee.setSalary(employeeDTO.getSalary());
      employee.setSpecialty(employeeDTO.getSpecialty());
      employee = employeeRepository.save(employee);
      return Optional.of(mapper.map(employee, EmployeeDTO.class));
    }
    return Optional.empty();
  }

  public List<EmployeeDTO> getAllEmployees(){
    return employeeRepository.findAll()
                            .stream()
                            .map((emp)-> mapper.map(emp, EmployeeDTO.class))
                            .toList();
  }

  public void deleteEmployee(Long employeeId){
    employeeRepository.deleteById(employeeId);
  }
}
