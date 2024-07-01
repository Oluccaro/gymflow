import React from 'react'
import ListDeal from '../screens/deal/list-deal'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const Deals = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name='list-deal' component={ListDeal}/>
    </Stack.Navigator>
  )
}

export default Deals