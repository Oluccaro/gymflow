package com.app.gymflow.dto;

import java.sql.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DealDTO {
  private Long id;
  private String description;
  private Double price;
  private Double chargeInterval;
  private Date startDate;
  private Date endDate;
  private Integer intervalNumber;
  private String intervalUnit;
  private List<ModalityDTO> modalities;
}
