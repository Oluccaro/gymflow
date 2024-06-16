package com.app.gymflow.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.gymflow.dto.Login;
import com.app.gymflow.dto.UserDTO;
import com.app.gymflow.dto.UserRegisterDTO;
import com.app.gymflow.model.User;
import com.app.gymflow.repository.UserRepository;

@Service
public class AuthService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private ModelMapper mapper;

  public Optional<UserDTO> login(Login login){
    User user = userRepository.findByEmailAndPassword(login.getEmail(), login.getPassword());
    if(user != null){
      return Optional.of(mapper.map(user, UserDTO.class));
    }
    return Optional.empty();
  }

  public UserDTO register(UserRegisterDTO userRegister){

    if(userRepository.findByEmail(userRegister.getEmail()) != null){
      throw new IllegalArgumentException("User with email" + userRegister.getEmail() + "already exists");
    }
    
    User user = mapper.map(userRegister, User.class);
    user = userRepository.save(user);
    return mapper.map(user, UserDTO.class);
    
  }
}
