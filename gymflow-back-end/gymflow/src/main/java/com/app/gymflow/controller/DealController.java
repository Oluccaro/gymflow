package com.app.gymflow.controller;

import java.util.List;
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

import com.app.gymflow.dto.DealDTO;
import com.app.gymflow.service.DealService;

@RestController
@RequestMapping("/deals")
public class DealController {

    @Autowired
    private DealService dealService;

    @GetMapping
    public List<DealDTO> getAllDeals() {
        return dealService.getAllDeals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<DealDTO> getDealById(@PathVariable Long id) {
        Optional<DealDTO> deal = dealService.getDealById(id);
        return deal.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping
    public ResponseEntity<DealDTO> createDeal(@RequestBody DealDTO deal) {
        DealDTO createdDeal = dealService.createDeal(deal);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDeal);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DealDTO> updateDeal(@PathVariable Long id,@RequestBody DealDTO updatedDeal) {
        try {
            DealDTO deal = dealService.updateDeal(id, updatedDeal);
            return ResponseEntity.ok(deal);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable Long id) {
        dealService.deleteDeal(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
