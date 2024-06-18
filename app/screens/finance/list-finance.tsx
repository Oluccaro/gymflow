import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import { AppBar, Button, IconButton, TextInput, ListItem  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useRouter } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StudentWithDebt } from '@/app/models/studentWithDebtModel';
import { getStudentsWithDebts } from '@/app/api/finance';

const ListFinance = () => {
    const [studentsWithDebt, setStudentsWithDebts] = useState<StudentWithDebt[]>([]);
    const [studentName, setStudentName] = useState<string>('');
    const router = useRouter();
  
    useEffect(() => {
      const fetchStudentsWithDebts = async () => {
        try {
            const studentsWithDebtList = await getStudentsWithDebts();
            setStudentsWithDebts(studentsWithDebtList);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchStudentsWithDebts();
    }, []);

    const renderItem = ({ item }: { item: StudentWithDebt }) => (
        <ListItem
              title={item.student.name}
              secondaryText={`clique para detalhes`}
              onPress={() => router.push(`/screens/finance/detail-finance?id=${item.student.id}`)}
              trailing={props => (
                    <Stack fill center spacing={3}>
                        <IconButton
                        icon={props => <Icon name="currency-usd"{...props} style={{ color: item.haveOpenDebt ? 'red' : 'green' }} />}
                        onPress={() => router.push(`/screens/finance/detail-finance?id=${item.student.id}`)}
                        {...props}
                        />
                    </Stack>
              )}
        />
      );
  
      return (
        <View style={{ flex: 1 }}>
              <AppBar
                 title="Financeiro"
                 style={Styles.appBar}
                 leading={props => (
                   <IconButton
                     icon={props => <Icon name="arrow-left" {...props} />}
                     onPress={() => router.back()}
                     {...props}/>
                 )}
        />
          <View style={Styles.container}>
              <SafeAreaView style={Styles.listContainer}>
              <FlatList
                  data={studentsWithDebt}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.student.id.toString()}
               />
            </SafeAreaView>
          </View>
        </View>
      );
  };

export default ListFinance;