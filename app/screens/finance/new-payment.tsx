import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AppBar, IconButton, TextInput, Button } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getStudentById } from '@/app/api/student';
import { createFinance } from '@/app/api/finance';
import { Finance } from '@/app/models/financeModel';
import { Student } from '@/app/models/StudentModel';

const NewPayment = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [student, setStudent] = useState<Student | null>(null);
  const [dueDate, setDueDate] = useState('');
  const [amountOwed, setAmountOwed] = useState('');
  const [amountPaid, setAmountPaid] = useState('');

  useEffect(() => {
    const fetchStudent = async () => {
      if (id) {
        const fetchedStudent = await getStudentById(parseInt(id));
        setStudent(fetchedStudent);
      }
    };
    fetchStudent();
  }, [id]);

  const handleCadastro = async () => {
    if (student) {
      const newFinance: Omit<Finance, 'id'> = {
        student,
        dueDate,
        amountOwed: parseFloat(amountOwed),
        amountPaid: parseFloat(amountPaid),
      };

      try {
        await createFinance(newFinance as Finance);
        router.push(`/screens/finance/detail-finance?id=${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Cadastrar Lançamentos"
        style={Styles.appBar}
        leading={props => (
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
            {...props}
            onPress={() => router.back()}
          />
        )}
      />
      <ScrollView>
        <View style={Styles.container}>
          <View style={Styles.inputContainer}>
            <VStack m={15} spacing={10}>
              {student && (
                <View style={styles.profileContainer}>
                  <IconButton
                    icon={() => <Icon name="account-circle" size={60} />}
                  />
                  <View>
                    <Text style={[styles.subtitle, { color: 'gray' }]}>Nome do titular</Text>
                    <Text style={styles.title}>{student.name}</Text>
                  </View>
                </View>
              )}
            </VStack>
          </View>
          <Text style={[styles.title, { color: 'white', alignContent: 'flex-start' }]}>DETALHES</Text>
          <View style={Styles.inputContainer}>
            <VStack m={15} spacing={10}>
              <TextInput
                placeholder="Data de vencimento (00/00/0000)"
                value={dueDate}
                onChangeText={setDueDate}
              />
              <TextInput
                placeholder="Valor devido (R$)"
                value={amountOwed}
                onChangeText={setAmountOwed}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Valor pago (R$)"
                value={amountPaid}
                onChangeText={setAmountPaid}
                keyboardType="numeric"
              />
              <Button
                title="Confirmar novo lançamento"
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

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewPayment;
