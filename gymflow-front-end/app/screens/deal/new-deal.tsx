import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput, ListItem, Switch } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Colors, Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Modality } from '@/app/models/modalityModel';
import { createDeal } from '@/app/api/deal';
import { useRouter } from 'expo-router';
import { Deal } from '@/app/models/dealModel';
import { getModalities } from '@/app/api/modality';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const NewDeal = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [chargeInterval, setChargeInterval] = useState(''); // Inicialize com uma string vazia
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [intervalUnit, setIntervalUnit] = useState('');
  const [intervalNumber, setIntervalNumber] = useState('');

  const [selectedModalities, setSelectedModalities] = useState<Modality[]>([]);
  const [allModalities, setAllModalities] = useState<Modality[]>([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fetchModalities = async () => {
      try {
        const modalitiesList = await getModalities();
        setAllModalities(modalitiesList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModalities();
  }, []);


  const handleCadastro = async () => {
    try {
      // Validar campos obrigatórios
      if (!description || !price || !chargeInterval || !startDate || !endDate || !intervalUnit || !intervalNumber || selectedModalities.length === 0) {
        Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      const newDeal: Deal = {
        id: 0, // Defina o ID conforme necessário
        description,
        price: parseFloat(price),
        chargeInterval: parseInt(chargeInterval),
        startDate,
        endDate,
        intervalNumber: parseInt(intervalNumber),
        intervalUnit,
        modalities: selectedModalities,
      };

      await createDeal(newDeal);

      Alert.alert('Sucesso', 'Plano cadastrado com sucesso');
      router.replace('/screens/deal/list-deal');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao cadastrar plano');
    }
  };
  
  const handleCheckboxChange = (modality: Modality, isChecked: boolean) => {
    if (isChecked) {
      setSelectedModalities(prev => [...prev, modality]);
    } else {
      setSelectedModalities(prev => prev.filter(item => item.id !== modality.id));
    }
    console.log(selectedModalities);
    
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Novo Plano"
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
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                placeholder="Preço"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
              <Text style={Styles.label}>Intervalo de Cobrança:</Text>
              <Picker
                selectedValue={chargeInterval}
                onValueChange={(itemValue) => setChargeInterval(itemValue)}
                style={Styles.picker}
              >
                <Picker.Item label="Selecione um intervalo" value="" />
                <Picker.Item label="Mensal" value="mensal" />
                <Picker.Item label="Trimestral" value="trimestral" />
                <Picker.Item label="Anual" value="anual" />
              </Picker>
              <Text style={Styles.label}>Validade do Plano:</Text>
              <TextInput
                placeholder="Válido de"
                value={startDate}
                onChangeText={setStartDate}
              />
              <TextInput
                placeholder="Válido até"
                value={endDate}
                onChangeText={setEndDate}
              />
              <Text style={Styles.label}>Selecione o período de vigência do plano:</Text>
              <TextInput
                placeholder="Número"
                value={intervalNumber}
                onChangeText={setIntervalNumber}
                keyboardType="numeric"
              />
              <Picker
                selectedValue={intervalUnit}
                onValueChange={(itemValue) => setIntervalUnit(itemValue)}
                style={Styles.picker}
              >
                <Picker.Item label="Selecione o período" value="" />
                <Picker.Item label="Dias" value="dias" />
                <Picker.Item label="Meses" value="meses" />
                <Picker.Item label="Anos" value="anos" />
              </Picker>
              <Text style={Styles.label}>Modalidades inclusas no plano:</Text>
              {allModalities.map(modality => (
                <BouncyCheckbox
                  size={25}
                  fillColor={Colors.primary}
                  iconStyle={{ borderColor: Colors.primary }}
                  innerIconStyle={{ borderWidth: 2 }}
                  textStyle={{
                    textDecorationLine: 'none', // Remove the dashed underline
                  }}
                  key={modality.id}
                  text={modality.name}
                  isChecked={selectedModalities.some(item => item.id === modality.id)}
                  onPress={(isChecked: boolean) => handleCheckboxChange(modality, isChecked)}
                />
              ))}
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

export default NewDeal;
