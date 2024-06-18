import React, { useState, useEffect }from 'react';
import { View, Text, StyleSheet, ScrollView,  SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { AppBar, Button, IconButton, TextInput, ListItem  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import studentData from '@/assets/students.json';



const ListDeal: React.FC = ({}) => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
      setStudents(studentData);
    }, []);

  const searchStudent = () => {
      if (searchQuery.trim() !== '') {
        const filteredStudents = studentData.filter(student =>
          student.nome.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setStudents(filteredStudents);
      } else {
        setStudents(studentData);
      }
    };

  const renderItem = ({ item }) => (
    <ListItem
          title={item.nome}
          secondaryText={`Telefone: ${item.phone}\nData de Nascimento: ${item.birthDate}\nSexo: ${item.sex}\nAltura: ${item.height}\nPeso: ${item.weight}\nPlano: ${item.plano}`}
            trailing={props => (
              <Icon
                name="pencil"
                {...props}
              />
          )}
        />
      );

  return (
   <View style={{ flex: 1 }}>
        <AppBar
           title="Planos"
           style={Styles.appBar}
           leading={props => (
             <IconButton
              icon={props => <Icon name="arrow-left" {...props} />}
              onPress={()=> router.back()}
              {...props}/>
           )}
        />
   <ScrollView>
    <View style={Styles.container}>
      <SafeAreaView style={Styles.listContainer}>
      <VStack m={15} spacing={10}>
        <TextInput
            placeholder="Pesquisar Plano"
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        <Button title="Pesquisar"
           style={Styles.searchButton}
           onPress={searchStudent}
        />

        {students.length > 0 ? (
            <FlatList
              data={students}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          ) : (
            <View style={Styles.noData}>
              <Text>Nenhum aluno registrado!</Text>
            </View>
          )}
         </VStack>
        </SafeAreaView>
    </View>
   </ScrollView>
   </View>
   )
}

export default ListDeal
