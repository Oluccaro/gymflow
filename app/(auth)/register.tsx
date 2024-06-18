import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { register } from '../api/login';

import { TextInput, Image, Pressable} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Styles, Images, Colors } from '@/constants';
import { Link, useRouter } from 'expo-router';
import { login } from '../api/login';
import { User } from '../models/User';




const Register: React.FC = () => {

  const [user, setUser] = useState<Partial<User>>({});
  const router = useRouter();

  const handleRegister = async () =>{
    try {
      await register(user);
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Login Error' + error.message);
    }
  };

  return (
    <View style={Styles.container}>
    <Image source={Images.gymflowLogo} style={Styles.image} />
    <View style={Styles.inputContainer}>
    <TextInput
        placeholder="Nome da Academia"
        value={user.gymName}
        onChangeText={(gymName) => setUser({...user, "gymName": gymName})}
        style={Styles.input}
      />
      <Text></Text>
      <TextInput
        placeholder="Nome de Usuário"
        value={user.userName}
        onChangeText={(userName)=> setUser({...user, "userName": userName})}
        style={Styles.input}
      />
      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(email) => setUser({...user, "email": email})}
        style={Styles.input}
      />
      <Text></Text>
      <TextInput
        placeholder="Password"
        value={user.password}
        onChangeText={(password)=> setUser({...user, "password": password})}
        secureTextEntry
        style={Styles.input}
      />
      <Pressable 
        style={Styles.mainButton}
        onPress={handleRegister}>
        <Text style={Styles.largeWhiteText}>Register</Text>
      </Pressable>
    </View>
    <View style={Styles.registerContainer}>
    </View>
  </View>      
  );
}

export default Register