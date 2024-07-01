package com.app.gymflow.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.dto.StudentRequest;
import com.app.gymflow.dto.StudentResponse;
import com.app.gymflow.model.Deal;
import com.app.gymflow.model.Student;
import com.app.gymflow.repository.DealRepository;
import com.app.gymflow.repository.StudentRepository;

@Service
public class StudentService {
  
  @Autowired
  private StudentRepository studentRepository;

  @Autowired DealRepository dealRepository;

  @Autowired
  private ModelMapper mapper;

  public StudentResponse createStudent(StudentRequest studentDTO){
    Deal deal = null;
    if(studentRepository.findByPhone(studentDTO.getPhone()) != null){
      throw new IllegalArgumentException("User with phone" + studentDTO.getPhone() + "already exists");
    }
    if(studentDTO.getDealId() != null){
      Optional<Deal> dealOpt = dealRepository.findById(studentDTO.getDealId());
      if(dealOpt.isEmpty()){
        throw new IllegalArgumentException("Deal with id " + studentDTO.getDealId() + "not found");
      }
      deal = dealOpt.get();
    }
    Student student = mapper.map(studentDTO, Student.class);
    if(deal != null){
      student.setDeal(deal);
    }
    student = studentRepository.save(student);
    return mapper.map(student, StudentResponse.class);
    
  }

  public Optional<StudentResponse> getStudent(Long studentId){
    Optional<Student> student = studentRepository.findById(studentId);
    if(student.isPresent()){
      return Optional.of(mapper.map(student, StudentResponse.class));
    }
    return Optional.empty();
  }

  public Optional<StudentResponse> updateStudent(Long studentId, StudentRequest studentDTO){
    Optional<Student> optStudent = studentRepository.findById(studentId);
    if(optStudent.isPresent()){
      Student student = optStudent.get();
      student.setBirthDate(studentDTO.getBirthDate());
      student.setName(studentDTO.getName());
      student.setPhone(studentDTO.getPhone());
      student.setHeight(studentDTO.getHeight());
      student.setSex(studentDTO.getSex());
      student.setWeight(studentDTO.getWeight());
      student = studentRepository.save(student);
      return Optional.of(mapper.map(student, StudentResponse.class));
    }
    return Optional.empty();
  }

  public List<StudentResponse> getAllStudents(){
    return studentRepository.findAll()
                            .stream()
                            .map((std)-> mapper.map(std, StudentResponse.class))
                            .toList();
  }

  public void deleteStudent(Long studentId){
    studentRepository.deleteById(studentId);
  }
}
