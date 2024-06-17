package com.app.gymflow.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.gymflow.model.Finance;
import com.app.gymflow.service.FinanceService;

@RestController
@RequestMapping("/finance")
public class FinanceController {

    @Autowired
    private FinanceService financeService;

    @GetMapping
    public List<Finance> getAllFinances() {
        return financeService.getAllFinances();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Finance> getFinanceById(@PathVariable Long id) {
        Optional<Finance> finance = financeService.getFinanceById(id);
        return finance.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<Finance> createFinance(@RequestBody Finance finance) {
        Finance createdFinance = financeService.createFinance(finance);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdFinance);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Finance> updateFinance(@PathVariable Long id, @RequestBody Finance updatedFinance) {
        try {
            Finance finance = financeService.updateFinance(id, updatedFinance);
            return ResponseEntity.ok(finance);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFinance(@PathVariable Long id) {
        financeService.deleteFinance(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/students_with_debts")
    public ResponseEntity<List<Map<String, Object>>> getStudentsWithOpenDebt() {
        List<Map<String, Object>> studentsWithDebt = financeService.getStudentsWithOpenDebt();
        return ResponseEntity.ok(studentsWithDebt);
    }
    
    @GetMapping("/student/{studentId}")
    public List<Finance> getStudentDebts(@PathVariable Long studentId) {
        return financeService.getFinancesByStudentId(studentId);
    }
}