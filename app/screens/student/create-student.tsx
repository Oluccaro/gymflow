import React, { useState }from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const CreateStudent = () => {

    const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [birthDate, setBirthDate] = useState('');
      const [sex, setSex] = useState('');
      const [height, setHeight] = useState('');
      const [weight, setWeight] = useState('');
      const [plano, setPlano] = useState('');

     const handleCadastro = () => {
        // Lógica para manipular o cadastro
        console.log({
          nome,
          phone,
          birthDate,
          sex,
          height,
          weight,
          plano,
        });
      };

  return (
        <View style={Styles.container}>
            <View style={Styles.inputContainer}>
                <VStack m={20} spacing={10}>
                  <TextInput
                    placeholder="Nome"
                    value={name}
                    onChangeText={setName}
                    style={Styles.input}
                  />
                  <Text></Text>
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

                  <TextInput
                       placeholder="Sexo"
                       value={sex}
                       onChangeText={setSex}
                  />
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

                 <Text className="text-black mb-2">Plano de Matrícula:</Text>
                   <Picker
                     selectedValue={plano}
                     onValueChange={(itemValue) => setPlano(itemValue)}
                     style={{ borderWidth: 1, borderColor: 'black', marginBottom: 20 }}
                   >
                     <Picker.Item label="Selecione um plano" value="" />
                     <Picker.Item label="Plano Mensal" value="mensal" />
                     <Picker.Item label="Plano Trimestral" value="trimestral" />
                     <Picker.Item label="Plano Anual" value="anual" />
                   </Picker>
                 <Button
                   title="Cadastrar"
                   onPress={handleCadastro}
                   style={[Styles.mainButton]}
                 />
                </VStack>
            </View>
       </View>
  );
};

export default CreateStudent