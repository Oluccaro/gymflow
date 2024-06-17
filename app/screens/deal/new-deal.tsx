import React, { useState }from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput, ListItem, Switch  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import ListModality from '@app/screens/modality/list-modality';


const NewDeal = () => {
    const [description, setDescription ] = useState('');
      const [price, setPrice] = useState('');
      const [chargeInterval, setChargeInterval] = useState('');
      const [startDate, setStartDate] = useState('');
      const [endDate, setEndDate] = useState('');
      const [intervalUnit, setIntervalUnit] = useState('');
      const [intervalNumber, setIntervalNumber] = useState('');
      const [modalities, setModalities] = useState([]);
      const [checked, setChecked] = useState(false);

    //useEffect(() => {
    //  loadModalidades();
   // }, []);

   // const loadModalities = async () => {
   //   const modalitiesLoaded = await listModalities();
   //   setModality(modalitiesLoaded);
  //  };

    const handleCadastro = () => {
        console.log('description: ', description);
         console.log('price: ', price);
         console.log('chargeInterval: ', chargeInterval);
         console.log('startDate: ', startDate);
         console.log('endDate: ', endDate);
         console.log('intervalUnit: ', intervalUnit);
         console.log('intervalNumber: ', intervalNumber);
         console.log('modalities: ', selactedModalities);
      };

  return (
    <View style={{ flex: 1 }}>
         <AppBar
            title="Novo Plano"
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
                           placeholder="Valido de"
                           value={startDate}
                           onChangeText={setStartDate}
                      />
                      <TextInput
                             placeholder="Valido até"
                             value={endDate}
                             onChangeText={setEndDate}
                      />

                      <Text style={Styles.label}>Selecione o período de vigência do plano, que contará a partir da data de confirmação:</Text>

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
                          <ListItem
                                title="List Item"
                                trailing={
                                  <Switch value={checked} onValueChange={() => setChecked(!checked)} />
                                }
                                onPress={() => setChecked(!checked)}
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

export default NewDeal