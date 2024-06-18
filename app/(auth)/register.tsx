import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';
import { User } from '../models/User';
import { register } from '../api/login';

const Register = () => {
  const handlerRegister = async () =>{
    try {
      const user: User = await register({"gymName": "academia da boa", "userName": "Juca do peso", "email": "teste@gym.com", "password": "senha" });
      console.log(user);
      
    } catch (error: any) {
      Alert.alert('Login Error' + error.message);
    }
  };

  handlerRegister();
  return (
    <View>
      <Text>Register</Text>
    </View>
  )
}

export default Register