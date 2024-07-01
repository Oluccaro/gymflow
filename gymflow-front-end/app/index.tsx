import React, { useContext, useState } from 'react';
import Login from '@/app/(auth)/login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)/home';
import { SafeAreaView } from 'react-native-safe-area-context';
import CreateStudent from './screens/student/create-student';


const Stack = createNativeStackNavigator();

const Home = () => {

  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
  )
}

export default Home