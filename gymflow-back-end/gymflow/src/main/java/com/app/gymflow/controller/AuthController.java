package com.app.gymflow.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.gymflow.dto.Login;
import com.app.gymflow.dto.UserDTO;
import com.app.gymflow.dto.UserRegisterDTO;
import com.app.gymflow.service.AuthService;

@RestController
@CrossOrigin
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<UserDTO> login(@RequestBody Login login){
    Optional<UserDTO> userDTO = authService.login(login);
    return userDTO.map(ResponseEntity::ok)
                  .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
  }

  @PostMapping("/register")
  public ResponseEntity<UserDTO> register(@RequestBody UserRegisterDTO userRegister){
    try{
      UserDTO user = authService.register(userRegister);
      return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }
    catch(IllegalArgumentException e){
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
  }
}
