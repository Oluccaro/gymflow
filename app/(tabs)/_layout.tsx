import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, Redirect} from 'expo-router'
import { Colors, Icons } from '@/constants'

const TabIcon = ({icon, color, name, focused} : {icon :any, color: any, name: any, focused: any}) =>{
  return (
    <View className='items-center justify-center'>
      <Image
        source={icon}
        tintColor={color}
        resizeMode='contain'
        className="w-5 h-5"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'}`} style={{color: Colors.white}}>{name}</Text>
    </View>
  )
}

const tabs = [
  { 
    name: "home",
    icon: Icons.home,
    title: "Home"
  },
  { 
    name: "students",
    icon: Icons.profile,
    title: "Alunos"
  },
  { 
    name: "finances",
    icon: Icons.finances,
    title: "Financeiro"
  },
  { 
    name: "deals",
    icon: Icons.deal,
    title: "Planos"
  },
]

const tabsScreen : React.ReactElement[] = [];

tabs.forEach(tab => {
  tabsScreen.push(
    <Tabs.Screen
          name={tab.name}
          options={{
            headerShown: false,
            tabBarIcon: ({color, focused}) => (
              <TabIcon
                icon={tab.icon}
                color={color}
                name={tab.title}
                focused={focused}
              />
            )
          }}
        />
  )
})

const TabsLayout = () => {
  return (
    <>
      <Tabs 
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: Colors.primary,
          tabBarStyle:{
            backgroundColor: Colors.backgroundMain,
            borderTopWidth: 1,
            borderTopColor: Colors.backgroundMain,
            height: 60
          }
        }} 
      >
        {tabsScreen}
      </Tabs>
    </>
  )
}

export default TabsLayout