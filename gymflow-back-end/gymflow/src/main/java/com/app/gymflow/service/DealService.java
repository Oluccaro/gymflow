package com.app.gymflow.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.dto.DealDTO;
import com.app.gymflow.model.Deal;
import com.app.gymflow.model.Modality;
import com.app.gymflow.repository.DealRepository;

import jakarta.transaction.Transactional;

@Service
public class DealService {
  
  @Autowired
  private DealRepository dealRepository;

  @Autowired
  private ModelMapper mapper;

  public List<DealDTO> getAllDeals() {
    return dealRepository.findAll()
                          .stream()
                          .map((deal) -> mapper.map(deal, DealDTO.class))
                          .toList();
  }

  public Optional<DealDTO> getDealById(Long id) {
    Optional<Deal> optDeal = dealRepository.findById(id);
    if(optDeal.isPresent()){
      Deal deal = optDeal.get();
      return Optional.of(mapper.map(deal, DealDTO.class));
    }
    return Optional.empty();
  }

  @Transactional
  public DealDTO createDeal(DealDTO dealDTO) {
    Deal deal = mapper.map(dealDTO, Deal.class);
    return mapper.map(dealRepository.save(deal), DealDTO.class);
  }

  @Transactional
  public DealDTO updateDeal(Long id, DealDTO updatedDeal) {
      Optional<Deal> optionalDeal = dealRepository.findById(id);
      if (optionalDeal.isPresent()) {
          Deal deal = optionalDeal.get();
          deal.setDescription(updatedDeal.getDescription());
          deal.setPrice(updatedDeal.getPrice());
          deal.setChargeInterval(updatedDeal.getChargeInterval());
          deal.setStartDate(updatedDeal.getStartDate());
          deal.setEndDate(updatedDeal.getEndDate());
          deal.setIntervalNumber(updatedDeal.getIntervalNumber());
          deal.setIntervalUnit(updatedDeal.getIntervalUnit());
          List<Modality> modalities = updatedDeal.getModalities()
                                                 .stream()
                                                 .map(mod -> mapper.map(mod, Modality.class))
                                                 .toList();
          deal.setModalities(modalities);
          deal = dealRepository.save(deal);
          DealDTO dealDTO = mapper.map(deal, DealDTO.class);
          return dealDTO;
      } else {
          throw new RuntimeException("Deal not found with id " + id);
      }
  }

  @Transactional
  public void deleteDeal(Long id) {
      dealRepository.deleteById(id);
  }
}