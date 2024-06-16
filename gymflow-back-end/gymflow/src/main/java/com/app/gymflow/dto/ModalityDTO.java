package com.app.gymflow.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModalityDTO {
  private Long id;
  private String name;
  private String description;
  private String healthBenefits;
}
