import { View, Text, StyleSheet, ScrollView,  SafeAreaView, FlatList, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AppBar, Button, IconButton, TextInput, ListItem  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import { deleteStudent, getStudents } from '@/app/api/student';
import { Student } from '@/app/models/StudentModel';

const ListStudent : React.FC = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const router = useRouter();

    useEffect(() => {
      const fetchStudents = async () => {
        try {
          const studentsList = await getStudents();
          setStudents(studentsList);
        } catch (error) {
          console.error(error);
        }
      };

      fetchStudents();
    }, []);


    const handleDelete = async (id: number) => {
      try {
        await deleteStudent(id);
        setStudents(students.filter(student => student.id !== id));
      } catch (error) {
        console.error(error);
      }
    };

    const renderItem = ({ item }: { item: Student }) => (
      <ListItem
            title={item.name}
            secondaryText={`Telefone: ${item.phone}\nData de Nascimento: ${item.birthDate}\nAltura: ${item.height}\nPeso: ${item.weight}`}
            trailing={props => (
                  <Stack fill center spacing={3}>
                  <IconButton
                    icon={props => <Icon name="pencil"{...props} />}
                    onPress={() => router.push(`/screens/student/update-student?id=${item.id}`)}
                    {...props}
                  />
                  <IconButton
                    icon={props => <Icon name="delete"{...props} />}
                    onPress={() => handleDelete(item.id)}
                    {...props}
                  />
                  </Stack>
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
                   {...props}/>
               )}
      />
        <View style={Styles.container}>
            <SafeAreaView style={Styles.listContainer}>
            <Button title="Adicionar"
               style={Styles.searchButton}
               leading={props => <Icon name="plus" {...props}/>}
              // onPress={} adicionar caminho para Cadastro
            />
            <FlatList
                data={students}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
             />
          </SafeAreaView>
        </View>
      </View>
    );
};


export default ListStudent
