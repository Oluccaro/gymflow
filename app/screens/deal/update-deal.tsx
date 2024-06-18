import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Styles, Colors } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Deal } from '@/app/models/dealModel';
import { getDealById, updateDeal } from '@/app/api/deal';
import { getModalities } from '@/app/api/modality';
import { Modality } from '@/app/models/modalityModel';

const UpdateDeal = () => {
  const [deal, setDeal] = useState<Partial<Deal>>({});
  const [modalities, setModalities] = useState<Modality[]>([]);
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const dealData = await getDealById(Number(id));
        setDeal(dealData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchModalities = async () => {
      try {
        const modalitiesList = await getModalities();
        setModalities(modalitiesList);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchDeal();
      fetchModalities();
    }
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) {
        await updateDeal(Number(id), deal);
        Alert.alert('Success', 'Deal updated successfully');
        router.replace('/screens/deal/list-deal');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update deal');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Editar Plano"
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
            <Text style={Styles.label}>Descrição:</Text>
              <TextInput
                title="Descrição"
                placeholder="Descrição"
                value={deal.description}
                onChangeText={(text) => setDeal({ ...deal, description: text })}
              />
              <Text style={Styles.label}>Preço:</Text>
              <TextInput
              title="Preço"
                placeholder="Preço"
                value={deal.price?.toFixed(2)}
                onChangeText={(text) => setDeal({ ...deal, price: parseFloat(text) })}
                keyboardType="numeric"
              />
              <Text style={Styles.label}>Intervalo de Cobrança:</Text>
              <TextInput
                title="Intervalo de Cobrança"
                placeholder="Intervalo de Cobrança (dias)"
                value={deal.chargeInterval?.toString()}
                onChangeText={(text) => setDeal({ ...deal, chargeInterval: parseInt(text, 10) })}
                keyboardType="numeric"
              />
              <Text style={Styles.label}>Data de Início:</Text>
              <TextInput
                title="Data de Início"
                placeholder="Data de Início"
                value={deal.startDate}
                onChangeText={(text) => setDeal({ ...deal, startDate: text })}
              />
              <Text style={Styles.label}>Data de Término:</Text>
              <TextInput
                title="Data de Término"
                value={deal.endDate}
                onChangeText={(text) => setDeal({ ...deal, endDate: text })}
              />
              <Text style={Styles.label}>Unidade de Intervalos:</Text>
              <TextInput
                title="Unidade de Intervalo"
                value={deal.intervalUnit}
                onChangeText={(text) => setDeal({ ...deal, intervalUnit: text })}
              />
              <Text style={Styles.label}>Número de Intervalos:</Text>
              <TextInput
                title="Número de Intervalos"
                value={deal.intervalNumber?.toString()}
                onChangeText={(text) => setDeal({ ...deal, intervalNumber: parseInt(text, 10) })}
                keyboardType="numeric"
              />
              <Text style={Styles.label}>Modalidade:</Text>
              <Picker
                selectedValue={deal.modalities?.[0]?.id}
                onValueChange={(value) => {
                  const selectedModality = modalities.find(mod => mod.id === value);
                  setDeal({ ...deal, modalities: selectedModality ? [selectedModality] : [] });
                }}
                style={Styles.picker}
              >
                <Picker.Item label="Selecione uma modalidade" value="" />
                {modalities.map((modality) => (
                  <Picker.Item key={modality.id} label={modality.name} value={modality.id} />
                ))}
              </Picker>
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

export default UpdateDeal;
