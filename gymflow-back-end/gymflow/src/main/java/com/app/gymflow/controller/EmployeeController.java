package com.app.gymflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.gymflow.dto.EmployeeDTO;
import com.app.gymflow.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

  @Autowired
  private EmployeeService employeeService;

  @GetMapping
  public ResponseEntity<List<EmployeeDTO>> getAllemployees(){
    return new ResponseEntity<List<EmployeeDTO>>(employeeService.getAllEmployees(), HttpStatusCode.valueOf(200));
  }

  @GetMapping("/{id}")
  public ResponseEntity<EmployeeDTO> getEmployee(@PathVariable Long id){
    Optional<EmployeeDTO> optemployee = employeeService.getEmployee(id);
    return optemployee.map(ResponseEntity::ok)
                     .orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @PostMapping
  public ResponseEntity<EmployeeDTO> createemployee(@RequestBody EmployeeDTO employeeDTO){
    try{
      EmployeeDTO employee = employeeService.createEmployee(employeeDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(employee);
    }
    catch(IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<EmployeeDTO> updateemployee(@PathVariable Long id, @RequestBody EmployeeDTO employeeDTO){
    Optional<EmployeeDTO> optemployee = employeeService.updateEmployee(id, employeeDTO);
    return optemployee.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteemployee(@PathVariable Long id){
    try {
      employeeService.deleteEmployee(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }
}
