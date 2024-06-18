import React, { useState }from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const NewActivity = () => {
    const [name, setName] = useState('');
      const [modality, setModality] = useState('');
      const [employee, setEmployee] = useState('');
      const [dayOfTheWeek, setDayOfTheWeek] = useState('');
      const [repeatEvery, setRepeatEvery] = useState('');
      const [startTime, setStartTime] = useState('');
      const [endTime, setEndTime] = useState('');
      const [description, setDescription] = useState('');

     const handleCadastro = () => {
         console.log('name: ', name);
         console.log('modality: ', modality);
         console.log('employee: ', employee);
         console.log('dayOfTheWeek: ', dayOfTheWeek);
         console.log('repeatEvery: ', repeatEvery);
         console.log('startTime: ', startTime);
         console.log('endTime: ', endTime);
         console.log('description: ', description);
      };

  return (
    <View style={{ flex: 1 }}>
         <AppBar
            title="Cadastrar Atividade"
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
                     <Picker
                         selectedValue={modality}
                         onValueChange={(itemValue) => setModality(itemValue)}
                         style={Styles.picker}
                     >
                      <Picker.Item label="Selecione uma modalidade" value="" />
                      <Picker.Item label="1" value="1" />
                      <Picker.Item label="2" value="2" />
                      <Picker.Item label="3" value="3" />
                     </Picker>

                    <Button
                       title="Nova Modalidade"
                       //onPress={handleCadastro}
                       style={[Styles.mainButton]}
                     />

                    <Text style={Styles.label}>Horário:</Text>

                    <Picker
                          selectedValue={dayOfTheWeek}
                          onValueChange={(itemValue) => setDayOfTheWeek(itemValue)}
                          style={Styles.picker}
                    >
                    <Picker.Item label="Dia da Semana" value="" />
                    <Picker.Item label="Segunda-Feira" value="segunda-feira" />
                    <Picker.Item label="Terça-Feira" value="terca-feira" />
                    <Picker.Item label="Quarta-Feira" value="quarta-feira" />
                    <Picker.Item label="Quinta-Feira" value="quinta-feira" />
                    <Picker.Item label="Sexta-Feira" value="sexta-feira" />
                    <Picker.Item label="Sábado" value="sabado" />
                    <Picker.Item label="Domingo" value="domingo" />
                    </Picker>

                    <Picker
                          selectedValue={repeatEvery}
                          onValueChange={(itemValue) => setRepeatEvery(itemValue)}
                          style={Styles.picker}
                    >
                    <Picker.Item label="Repete a cada" value="" />
                    <Picker.Item label="1 dia" value="1" />
                    <Picker.Item label="2 dias" value="2" />
                    <Picker.Item label="7 dias" value="7" />
                    <Picker.Item label="15 dias" value="15"/>
                    <Picker.Item label="30 dias" value="30"/>
                    </Picker>

                    <Picker
                          selectedValue={employee}
                          onValueChange={(itemValue) => setEmployee(itemValue)}
                          style={Styles.picker}
                    >
                    <Picker.Item label="Selecione o professor" value="" />
                    </Picker>

                    <TextInput
                         placeholder="Horário de Início"
                         value={startTime}
                         onChangeText={setStartTime}
                    />
                    <TextInput
                         placeholder="Horário de Término"
                         value={endTime}
                         onChangeText={setEndTime}
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

export default NewActivity