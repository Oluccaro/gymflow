import React, { useState }from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const NewModality = () => {

    const [name, setName] = useState('');
      const [description, setDescription] = useState('');
      const [birthDate, setBirthDate] = useState('');
      const [healthBenefits, setHealthBenefits] = useState('');

     const handleCadastro = () => {
        // Lógica para manipular o cadastro
        console.log('name: ', name);
         console.log('description: ', description);
         console.log('healthBenefits: ', healthBenefits);
      };

  return (
    <View style={{ flex: 1 }}>
         <AppBar
            title="Nova Modalidade"
            style={Styles.appBar}
                leading={props => (
                  <IconButton
                    icon={props => <Icon name="arrow-left" {...props} />}
                    {...props}/>
                )}
         />
         <ScrollView>
             <View style={Styles.container}>
                <View style={Styles.inputContainer}>
                    <VStack m={15} spacing={10}>
                     <TextInput
                       placeholder="Nome"
                       value={name}
                       onChangeText={setName}

                     />
                      <TextInput
                          placeholder="Description"
                          value={description}
                          onChangeText={setDescription}
                      />

                      <TextInput
                           placeholder="Benefícios"
                           value={healthBenefits}

                           onChangeText={healthBenefits}
                      />
                      <Button
                           title="Cadastrar"
                           onPress={handleCadastro}
                           style={[Styles.mainButton]}
                     />
                    </VStack>
                </View>
             </View>
         </ScrollView>
    </View>
  );
};

export default NewModality
