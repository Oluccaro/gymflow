package com.app.gymflow.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.dto.StudentDTO;
import com.app.gymflow.model.Student;
import com.app.gymflow.repository.StudentRepository;

@Service
public class StudentService {
  
  @Autowired
  private StudentRepository studentRepository;

  @Autowired
  private ModelMapper mapper;

  public StudentDTO createStudent(StudentDTO studentDTO){

    if(studentRepository.findByPhone(studentDTO.getPhone()) != null){
      throw new IllegalArgumentException("User with phone" + studentDTO.getPhone() + "already exists");
    }
    
    Student student = mapper.map(studentDTO, Student.class);
    student = studentRepository.save(student);
    return mapper.map(student, StudentDTO.class);
    
  }

  public Optional<StudentDTO> getStudent(Long studentId){
    Optional<Student> student = studentRepository.findById(studentId);
    if(student.isPresent()){
      return Optional.of(mapper.map(student, StudentDTO.class));
    }
    return Optional.empty();
  }

  public Optional<StudentDTO> updateStudent(Long studentId, StudentDTO studentDTO){
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
      return Optional.of(mapper.map(student, StudentDTO.class));
    }
    return Optional.empty();
  }

  public List<StudentDTO> getAllStudents(){
    return studentRepository.findAll()
                            .stream()
                            .map((std)-> mapper.map(std, StudentDTO.class))
                            .toList();
  }

  public void deleteStudent(Long studentId){
    studentRepository.deleteById(studentId);
  }
}
