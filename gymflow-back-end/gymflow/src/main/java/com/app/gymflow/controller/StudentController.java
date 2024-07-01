package com.app.gymflow.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.gymflow.dto.StudentRequest;
import com.app.gymflow.dto.StudentResponse;
import com.app.gymflow.service.StudentService;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

  @Autowired
  private StudentService studentService;

  @GetMapping
  public ResponseEntity<List<StudentResponse>> getAllStudents(){
    return new ResponseEntity<List<StudentResponse>>(studentService.getAllStudents(), HttpStatusCode.valueOf(200));
  }

  @GetMapping("/{id}")
  public ResponseEntity<StudentResponse> getStudent(@PathVariable Long id){
    Optional<StudentResponse> optStudent = studentService.getStudent(id);
    return optStudent.map(ResponseEntity::ok)
                     .orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @PostMapping
  public ResponseEntity<StudentResponse> createStudent(@RequestBody StudentRequest studentDTO){
    try{
      StudentResponse student = studentService.createStudent(studentDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(student);
    }
    catch(IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<StudentResponse> updateStudent(@PathVariable Long id, @RequestBody StudentRequest studentDTO){
    Optional<StudentResponse> optStudent = studentService.updateStudent(id, studentDTO);
    return optStudent.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteStudent(@PathVariable Long id){
    try {
      studentService.deleteStudent(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }
}
