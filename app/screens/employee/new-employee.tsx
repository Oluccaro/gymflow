import React, { useState }from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const NewEmployee = () => {

    const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [birthDate, setBirthDate] = useState('');
      const [sex, setSex] = useState('');
      const [height, setHeight] = useState('');
      const [weight, setWeight] = useState('');
      const [salary, setSalary] = useState('');
      const [specialty, setSpecialty] = useState('');

     const handleCadastro = () => {
        console.log('name: ', name);
        console.log('phone: ', phone);
        console.log('birthDate: ', birthDate);
        console.log('sex: ', sex);
        console.log('height: ', height);
        console.log('weight: ', weight);
        console.log('salary: ', salary);
      };

  return (
    <View style={{ flex: 1 }}>
         <AppBar
            title="Novo Funcionário"
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
                          placeholder="Celular"
                          value={phone}
                          onChangeText={setPhone}
                          keyboardType="phone-pad"
                      />

                      <TextInput
                           placeholder="Data de Nascimento"
                             value={birthDate}
                             onChangeText={setBirthDate}
                      />

                      <Text style={Styles.label}>Gênero:</Text>
                        <Picker
                          selectedValue={sex}
                          onValueChange={(itemValue) => setSex(itemValue)}
                          style={Styles.picker}
                        >
                        <Picker.Item label="Selecione o gênero" value="" />
                        <Picker.Item label="Feminino" value="F" />
                        <Picker.Item label="Masculino" value="M" />
                        </Picker>

                      <TextInput
                       placeholder="Altura (cm)"
                       value={height}
                       onChangeText={setHeight}
                       keyboardType="numeric"
                      />

                      <TextInput
                       placeholder="Peso (kg)"
                       value={weight}
                       onChangeText={setWeight}
                       keyboardType="numeric"
                     />

                     <TextInput
                        placeholder="Salário"
                        value={salary}
                        onChangeText={setSalary}
                        keyboardType="numeric"
                     />

                     <TextInput
                        placeholder="Especialidade"
                        value={specialty}
                        onChangeText={setSpecialty}
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

export default NewEmployee