import { View, Text, ScrollView,  SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors, Styles } from '@/constants';
import Login from '@/app/(auth)/login';




const Home = () => {

  const route = useRouter();

  return (
    <>
      <StatusBar
        style='light'
      />
      <SafeAreaView className="bg-primaryBackground h-full">
        <Stack.Screen 
          options={{headerStyle: {backgroundColor: Colors.white}, headerShown:false}}
        />
        <Login></Login>
      </SafeAreaView>
    </>
  )
}

export default Home