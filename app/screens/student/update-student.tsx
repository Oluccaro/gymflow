import React, { useEffect, useState }from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
// import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Student } from '@/app/models/StudentModel';
import { getStudentById, updateStudent } from '@/app/api/student';

const UpdateStudent = () => {
    const [student, setStudent] = useState<Partial<Student>>({});
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [plano, setPlano] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    useEffect(() => {
      const fetchStudent = async () => {
        try {
          const studentData = await getStudentById(Number(id)); // Fetch student data using id
          setStudent(studentData);
        } catch (error) {
          console.error(error);
        }
      };
  
      if (id) {
        fetchStudent();
      }
    }, [id]);
    console.log(student);

    const handleSave = async () => {
    try {
      if (id) {
        const updatedStudent = await updateStudent(Number(id), student);
        Alert.alert('Success', 'Student updated successfully');
        router.replace('/screens/student/list-student'); // Navigate back to student list
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update student');
    }
  };

  return (
    <View style={{ flex: 1 }}>
         <AppBar
            title="Editar Aluno"
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
                <View style={Styles.inputContainer}>
                    <VStack m={15} spacing={10}>
                     <TextInput
                       placeholder="Nome"
                       value={student.name}
                       onChangeText={(text) => setStudent({...student, name: text})}

                     />
                      <TextInput
                          placeholder="Celular"
                          value={student.phone}
                          onChangeText={(phone) => setStudent({...student, phone: phone})}
                          keyboardType="phone-pad"
                      />

                      <TextInput
                           placeholder="Data de Nascimento"
                             value={student.birthDate}
                             onChangeText={(birthDate) => setStudent({...student, birthDate: birthDate})}
                      />

                      <Text style={Styles.label}>Gênero:</Text>
                        <Picker
                          selectedValue={student.sex}
                          onValueChange={(sex) => setStudent({...student, sex: sex})}
                          style={Styles.picker}
                        >
                        <Picker.Item label="Selecione o gênero" value="" />
                        <Picker.Item label="Feminino" value="F" />
                        <Picker.Item label="Masculino" value="M" />
                        </Picker>

                      <TextInput
                       placeholder="Altura (cm)"
                       value={student.height?.toFixed(2)}
                       onChangeText={(height) => setStudent({...student, height: parseFloat(height)})}
                       keyboardType="numeric"
                      />

                      <TextInput
                       placeholder="Peso (kg)"
                       value={student.weight?.toFixed(2)}
                       onChangeText={(weight) => setStudent({...student, weight: parseFloat(weight)})}
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
                     </Picker>
                     <Button
                       title="Editar"
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

export default UpdateStudent