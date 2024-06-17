package com.app.gymflow.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.model.Finance;
import com.app.gymflow.model.Student;
import com.app.gymflow.repository.FinanceRepository;
import com.app.gymflow.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class FinanceService {

    @Autowired
    private FinanceRepository financeRepository;

    @Autowired
    private StudentRepository studentRepository;

    public List<Finance> getAllFinances() {
        return financeRepository.findAll();
    }

    public Optional<Finance> getFinanceById(Long id) {
        return financeRepository.findById(id);
    }

    @Transactional
    public Finance createFinance(Finance finance) {
        Optional<Student> optStudent = studentRepository.findById(finance.getStudent().getId());
        if(optStudent.isPresent()){
            Student student = optStudent.get();
            finance.setStudent(student);
        }
        return financeRepository.save(finance);
    }

    @Transactional
    public Finance updateFinance(Long id, Finance updatedFinance) {
        Optional<Finance> optionalFinance = financeRepository.findById(id);
        if (optionalFinance.isPresent()) {
            Finance finance = optionalFinance.get();
            Optional<Student> optStudent = studentRepository.findById(finance.getStudent().getId());
            if(optStudent.isPresent()){
                Student student = optStudent.get();
                finance.setStudent(student);
            } else {
                throw new RuntimeException("Student not found with id " + updatedFinance.getStudent().getId());
            }
            finance.setDueDate(updatedFinance.getDueDate());
            finance.setAmountOwed(updatedFinance.getAmountOwed());
            finance.setAmountPaid(updatedFinance.getAmountPaid());
            return financeRepository.save(finance);
        } else {
            throw new RuntimeException("Finance not found with id " + id);
        }
    }

    @Transactional
    public void deleteFinance(Long id) {
        financeRepository.deleteById(id);
    }

    public List<Map<String, Object>> getStudentsWithOpenDebt() {
        List<Object[]> results = financeRepository.findStudentsWithOpenDebt();
        List<Map<String, Object>> formattedResults = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Object> formattedResult = Map.of(
                    "student", result[0],
                    "haveOpenDebt", result[1]
            );
            formattedResults.add(formattedResult);
        }

        return formattedResults;
    }

    public List<Finance> getFinancesByStudentId(Long studentId) {
        return financeRepository.findFinancesByStudentId(studentId);
    }
}