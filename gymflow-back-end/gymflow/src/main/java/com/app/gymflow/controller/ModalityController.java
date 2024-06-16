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

import com.app.gymflow.dto.ModalityDTO;
import com.app.gymflow.service.ModalityService;

@RestController
@RequestMapping("/modality")
public class ModalityController {

  @Autowired
  private ModalityService modalityService;

  @GetMapping
  public ResponseEntity<List<ModalityDTO>> getAllModalitys(){
    return new ResponseEntity<List<ModalityDTO>>(modalityService.getAllModalitys(), HttpStatusCode.valueOf(200));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ModalityDTO> getModality(@PathVariable Long id){
    Optional<ModalityDTO> optmodality = modalityService.getModality(id);
    return optmodality.map(ResponseEntity::ok)
                     .orElseGet(()->ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @PostMapping
  public ResponseEntity<ModalityDTO> createModality(@RequestBody ModalityDTO modalityDTO){
    try{
      ModalityDTO modality = modalityService.createModality(modalityDTO);
      return ResponseEntity.status(HttpStatus.CREATED).body(modality);
    }
    catch(IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }

  @PutMapping("/{id}")
  public ResponseEntity<ModalityDTO> updatemodality(@PathVariable Long id, @RequestBody ModalityDTO modalityDTO){
    Optional<ModalityDTO> optmodality = modalityService.updateModality(id, modalityDTO);
    return optmodality.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> deletemodality(@PathVariable Long id){
    try {
      modalityService.deletemodality(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }
}
