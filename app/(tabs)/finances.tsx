import ListFinance from '../screens/finance/list-finance'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const Finances = () => {
  return (
   <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
         <Stack.Screen name='list-finance' component={ListFinance}/>
    </Stack.Navigator>
  )
}

export default Finances