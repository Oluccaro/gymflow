import React, { useState }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppBar, Button, IconButton } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate(screenName);
  };

  return (
   <View style={Styles.container}>
        <VStack m={20} spacing={12}>
          <HStack spacing={14}>
              <Button title="Alunos"
              style={[Styles.button]}
              />
              <Button title="Planos"

              style={[Styles.button]}
              />
          </HStack>
          <HStack spacing={12}>
              <Button title="Atividades"
              style={[Styles.button]}
              />
              <Button title="Funcionários"
              style={[Styles.button]}
              />
          </HStack>
          <HStack spacing={12}>
            <Button title="Financeiro"
            style={[Styles.button]}
            />
          </HStack>
          </VStack>
          <VStack m={40} spacing={10}>
          <HStack spacing={12}>
              <Button title="Novo Aluno"
              style={[Styles.pillButton]}
              leading={props => <Icon name="plus" {...props} />}
              />
              <Button title="Pagamento"
              style={[Styles.pillButton]}
              leading={props => <Icon name="plus" {...props} />}
              />

          </HStack>
       </VStack>
   </View>
);
};



export default HomeScreen;