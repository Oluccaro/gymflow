import ListStudent from '../screens/student/list-student'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();


const Students = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
         <Stack.Screen name='list-student' component={ListStudent}/>
    </Stack.Navigator>
  )
}

export default Students