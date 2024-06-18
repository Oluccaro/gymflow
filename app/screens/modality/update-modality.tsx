import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { AppBar, Button, IconButton, TextInput } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getModalityById, updateModality } from '@/app/api/modality';
import { Modality } from '@/app/models/modalityModel';

const UpdateModality = () => {
  const [modality, setModality] = useState<Partial<Modality>>({});
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const fetchModality = async () => {
      try {
        const modalityData = await getModalityById(Number(id));
        setModality(modalityData);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchModality();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) {
        await updateModality(Number(id), modality);
        Alert.alert('Sucesso', 'Modalidade atualizada com sucesso');
        router.replace('/screens/modality/list-modality');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao atualizar a modalidade');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Editar Modalidade"
        style={Styles.appBar}
        leading={props => (
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
            onPress={() => router.back()}
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
                value={modality.name}
                onChangeText={(text) => setModality({ ...modality, name: text })}
              />
              <TextInput
                placeholder="Descrição"
                value={modality.description}
                onChangeText={(text) => setModality({ ...modality, description: text })}
              />
              <TextInput
                placeholder="Benefícios para a Saúde"
                value={modality.healthBenefits}
                onChangeText={(text) => setModality({ ...modality, healthBenefits: text })}
              />
              <Button
                title="Salvar"
                onPress={handleSave}
                style={[Styles.mainButton]}
              />
            </VStack>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateModality;
