package com.app.gymflow.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.gymflow.model.Finance;

public interface FinanceRepository extends JpaRepository<Finance, Long>{

  @Query("SELECT f.student, CASE WHEN SUM(f.amountOwed - f.amountPaid) > 0 THEN true ELSE false END as haveOpenDebt " +
           "FROM t_finance f GROUP BY f.student")
  List<Object[]> findStudentsWithOpenDebt();

  @Query("SELECT f FROM t_finance f where f.student.id = :student_id order by (f.amountOwed - f.amountPaid) desc")
  List<Finance> findFinancesByStudentId(@Param("student_id") Long studentId);
}
