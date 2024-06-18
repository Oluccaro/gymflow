import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { AppBar, Button, IconButton, TextInput } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Modality } from '@/app/models/modalityModel';
import { createModality } from '@/app/api/modality';
import { useRouter } from 'expo-router';

const NewModality = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [healthBenefits, setHealthBenefits] = useState('');

  const handleCadastro = async () => {
    try {
      // Validar campos obrigatórios
      if (!name || !description || !healthBenefits) {
        Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const newModality: Modality = {
        id: 0, // Se estiver criando um novo, o ID pode ser 0 ou null, dependendo da lógica no backend
        name,
        description,
        healthBenefits,
      };
      await createModality(newModality);

    Alert.alert('Sucesso', 'Modalidade cadastrada com sucesso');
      router.replace('/screens/modality/list-modality'); // Navigate back to modality list
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao cadastrar aluno');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Nova Modalidade"
        style={Styles.appBar}
        leading={props => (
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
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
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                placeholder="Benefícios"
                value={healthBenefits}
                onChangeText={setHealthBenefits}
              />
              <Button
                title="Cadastrar"
                onPress={handleCadastro}
                style={Styles.mainButton}
              />
            </VStack>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewModality;
