import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Colors, Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import { createStudent } from '@/app/api/student'; // Ajuste para o método de criação do aluno
import { Student } from '@/app/models/StudentModel';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInputMask } from 'react-native-masked-text';

// Definir o esquema de validação com Yup
const schema = yup.object().shape({
  name: yup.string().required('* Nome é obrigatório'),
  phone: yup.string().required('* Celular é obrigatório'),
  height: yup.number().typeError('Altura deve ser um número'),
  weight: yup.number().typeError('Peso deve ser um número'),
  plano: yup.string().required('* Plano é obrigatório'),
});

const CreateStudent = () => {  
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleCadastro = async (data) => {
    try {
      const newStudent: Student = {
        id: 0,
        ...data,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
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
    <View style={{ flex: 1, backgroundColor: Colors.backgroundMain }}>
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
      <ScrollView contentContainerStyle={Styles.container}>
        <View style={Styles.inputContainer}>
          <VStack m={15} spacing={10}>
            <Text style={Styles.label}>* Campos com asterisco são obrigatórios</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'custom'}
                  options={{
                    mask: '***************************'
                  }}
                  placeholder="* Nome"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={Styles.inputCadastro}
                />
              )}
            />
            {errors.name && <Text>{errors.name.message}</Text>}

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'cel-phone'}
                  placeholder="* Celular"
                  options={{
                    maskType: 'BRL',
                    withDDD: true,
                    dddMask: '(99) '
                  }}
                  value={value}
                  style={Styles.inputCadastro}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && <Text>{errors.phone.message}</Text>}

            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'datetime'}
                  placeholder="Data de Nascimento"
                  options={{
                    format: 'DD/MM/YYYY'
                  }}
                  value={value}
                  style={Styles.inputCadastro}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.birthDate && <Text>{errors.birthDate.message}</Text>}

            <Controller
              control={control}
              name="sex"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={Styles.picker}
                >
                  <Picker.Item label="Selecione o gênero" value="" />
                  <Picker.Item label="Feminino" value="F" />
                  <Picker.Item label="Masculino" value="M" />
                </Picker>
              )}
            />
            {errors.sex && <Text>{errors.sex.message}</Text>}

            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'only-numbers'}
                  placeholder="Altura (cm)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={Styles.inputCadastro}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.height && <Text>{errors.height.message}</Text>}

            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInputMask
                  type={'money'}
                  options={{
                    precision: 2,
                    separator: ',',
                    delimiter: '.',
                    unit: '',
                    suffixUnit: ' kg'
                  }}
                  placeholder="Peso (kg)"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  style={Styles.inputCadastro}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.weight && <Text>{errors.weight.message}</Text>}

            <Controller
              control={control}
              name="plano"
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={Styles.picker}
                >
                  <Picker.Item label="* Selecione um plano" value="" />
                  <Picker.Item label="Plano Mensal" value="mensal" />
                  <Picker.Item label="Plano Trimestral" value="trimestral" />
                  <Picker.Item label="Plano Anual" value="anual" />
                </Picker>
              )}
            />
            {errors.plano && <Text>{errors.plano.message}</Text>}

            <Button
              title="Cadastrar"
              onPress={handleSubmit(handleCadastro)}
              style={[Styles.mainButton]}
            />
          </VStack>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateStudent;
