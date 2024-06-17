package com.app.gymflow.dto;

import com.app.gymflow.model.Student;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentWithDebts {
  private Student student;
  private boolean haveOpenDebt;
}
