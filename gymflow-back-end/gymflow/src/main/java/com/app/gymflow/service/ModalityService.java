package com.app.gymflow.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.dto.ModalityDTO;
import com.app.gymflow.model.Modality;
import com.app.gymflow.repository.ModalityRepository;

@Service
public class ModalityService {
  
  @Autowired
  private ModalityRepository modalityRepository;

  @Autowired
  private ModelMapper mapper;

  public ModalityDTO createModality(ModalityDTO modalityDTO){

    if(modalityRepository.findByName(modalityDTO.getName()) != null){
      throw new IllegalArgumentException("User with name" + modalityDTO.getName() + "already exists");
    }
    
    Modality modality = mapper.map(modalityDTO, Modality.class);
    modality = modalityRepository.save(modality);
    return mapper.map(modality, ModalityDTO.class);
    
  }

  public Optional<ModalityDTO> getModality(Long modalityId){
    Optional<Modality> modality = modalityRepository.findById(modalityId);
    if(modality.isPresent()){
      return Optional.of(mapper.map(modality, ModalityDTO.class));
    }
    return Optional.empty();
  }

  public Optional<ModalityDTO> updateModality(Long modalityId, ModalityDTO modalityDTO){
    Optional<Modality> optmodality = modalityRepository.findById(modalityId);
    if(optmodality.isPresent()){
      Modality modality = optmodality.get();
      modality.setName(modalityDTO.getName());
      modality.setDescription(modalityDTO.getDescription());
      modality.setHealthBenefits(modalityDTO.getHealthBenefits());
      modality = modalityRepository.save(modality);
      return Optional.of(mapper.map(modality, ModalityDTO.class));
    }
    return Optional.empty();
  }

  public List<ModalityDTO> getAllModalitys(){
    return modalityRepository.findAll()
                            .stream()
                            .map((std)-> mapper.map(std, ModalityDTO.class))
                            .toList();
  }

  public void deletemodality(Long modalityId){
    modalityRepository.deleteById(modalityId);
  }
}
