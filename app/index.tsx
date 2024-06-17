import { View, Text, ScrollView,  SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors, Styles } from '@/constants';
import Login from '@/app/(auth)/login';
import CreateStudent from '@/app/screens/student/create-student'
import NewEmployee from '@/app/screens/employee/new-employee'
import NewActivity from '@/app/screens/activity/new-activity'




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
        <NewActivity></NewActivity>
      </SafeAreaView>
    </>
  )
}

export default Home