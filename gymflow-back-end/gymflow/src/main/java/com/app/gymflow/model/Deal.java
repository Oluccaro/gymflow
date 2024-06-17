package com.app.gymflow.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "t_deal")
public class Deal {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "description", nullable = false)
  private String description;

  @Column(name = "price")
  private Double price;

  @Column(name = "charge_interval")
  private Double chargeInterval;

  @Column(name = "validity_date_start")
  private Date startDate;

  @Column(name = "validity_date_end")
  private Date endDate;

  @Column(name = "interval_number")
  private Integer intervalNumber;

  @Column(name = "interval_unit")
  private String intervalUnit;

  @ManyToMany
  @JoinTable(
    name = "t_deal_modality",
    joinColumns = @JoinColumn(name = "deal_id"),
    inverseJoinColumns = @JoinColumn(name = "modality_id")
  )
  private List<Modality> modalities;

}
