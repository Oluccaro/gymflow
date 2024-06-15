import React, {useState} from 'react';
import { View, Text, TextInput, Button, Image, TouchableOpacity, Pressable} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Styles, Icons, Images, Colors } from '@/constants';
import { Link } from 'expo-router';

export default function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleLogin = () =>{
    console.log('username: ', username);
    console.log('password: ', password);
    console.log('remember Me: ', rememberMe);
  }  

  return (
    <View style={Styles.container}>
    <Image source={Images.gymflowLogo} style={Styles.image} />
    <View style={Styles.inputContainer}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={Styles.input}
      />
      <Text></Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={Styles.input}
      />
      <View style={Styles.rememberMeContainer}>
        <CheckBox
          title={"Remember Me"}
          checked={rememberMe}
          onPress={() => setRememberMe(!rememberMe)}
        />
      </View>
      <Pressable 
        style={Styles.mainButton}
        onPress={handleLogin}>
        <Text style={Styles.largeWhiteText}>Login</Text>
      </Pressable>
    </View>
    <View style={Styles.registerContainer}>
      <Text style={Styles.whiteText}>Don't have an account? </Text>
      {/* <TouchableOpacity onPress={() => console.log('Navigate to Register screen')}>
        <Text style={Styles.registerText}>Register</Text>
      </TouchableOpacity> */}
      <Link href="/home" style={{color: Colors.primary}}>Register</Link>
    </View>
  </View>      
  );
}
