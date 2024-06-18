import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import { createStudent } from '@/app/api/student'; // Ajuste para o método de criação do aluno
import { Student } from '@/app/models/StudentModel';

const CreateStudent = () => {  
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [plano, setPlano] = useState('');

  const handleCadastro = async () => {
    try {
      // Validar campos obrigatórios (exemplo)
      if (!name || !phone || !birthDate || !sex || !height || !weight || !plano) {
        Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const newStudent: Student = {
        id: 0, // Se estiver criando um novo, o ID pode ser 0 ou null, dependendo da lógica no backend
        name,
        phone,
        birthDate,
        sex: sex as 'M' | 'F',
        height: parseFloat(height),
        weight: parseFloat(weight),
      };
      await createStudent(newStudent);

      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso');
      router.replace('/screens/student/list-student'); // Navigate back to student list
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao cadastrar aluno');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Novo Aluno"
        style={Styles.appBar}
        leading={props => (
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
            onPress={()=> router.back()}
            {...props}
          />
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
              <Text style={Styles.label}>Plano de Matrícula:</Text>
              <Picker
                selectedValue={plano}
                onValueChange={(itemValue) => setPlano(itemValue)}
                style={Styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                <Picker.Item label="Plano Mensal" value="mensal" />
                <Picker.Item label="Plano Trimestral" value="trimestral" />
                <Picker.Item label="Plano Anual" value="anual" />
                <Picker.Item label="Deals" value="deals" />
              </Picker>
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

export default CreateStudent;
