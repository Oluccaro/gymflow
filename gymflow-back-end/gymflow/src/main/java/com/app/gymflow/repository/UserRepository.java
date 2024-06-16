package com.app.gymflow.repository;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.jpa.repository.Query;

import com.app.gymflow.model.User;


public interface UserRepository extends JpaRepository<User, Long> {
  
  // @Query("SELECT u FROM User u where u.email = :email and u.password = :password")
  User findByEmailAndPassword(String emailString, String passString);

  User findByEmail(String email);
}
