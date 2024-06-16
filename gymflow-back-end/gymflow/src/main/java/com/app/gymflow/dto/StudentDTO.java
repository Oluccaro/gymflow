package com.app.gymflow.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
  private Long id;
  private String name;
  private String phone;
  private Date birthDate;
  private Character sex;
  private Double height;
  private Double weight;
}
