import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import { Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { deleteFinance, getFinanceByStudentId } from '@/app/api/finance';
import { getStudentById } from '@/app/api/student';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Finance } from '@/app/models/financeModel';

const DetailFinance: React.FC = () => {
  const [finances, setFinances] = useState<Finance[]>([]);
  const [studentName, setStudentName] = useState<string>('');
  const router = useRouter();
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchStudentAndFinances = async () => {
      try {
        if (typeof id === 'string') {
          const student = await getStudentById(parseInt(id));
          setStudentName(student.name);
          const financesList = await getFinanceByStudentId(parseInt(id));
          setFinances(financesList);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudentAndFinances();
  }, [id]);

  const handlePress = (path: string) => {
    router.push(path);
  };

  const handleDelete = async (id: number) => {
    Alert.alert('Excluir', `Tem certeza que deseja excluir a conta ${id}?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            await deleteFinance(id);
            setFinances(finances.filter(finance => finance.id !== id));
          } catch (error) {
            console.error(error);
          }
        }
      }
    ]);
  };

  const handlePayment = (finances: Finance) => {
    console.log('Mudando de tela:', finances.id);
    // Aqui você pode adicionar a lógica de navegação
    // navigation.navigate('Payment', { finances.id });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Financeiro Detalhe"
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
            <Text style={styles.title}>{studentName}</Text>
            <Text style={styles.subtitle}>Contas</Text>
            <View style={styles.listContainer}>
              {finances.map((finance, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.financeDetails}>
                    <View style={styles.idContainer}>
                      <View style={styles.left}>
                        <Icon name="receipt" style={styles.icon} />
                        <Text style={styles.amount}>{finance.id}</Text>
                      </View>
                      <Text style={styles.amount}>
                        {finance.amountOwed - finance.amountPaid > 0
                          ? `R$ ${(finance.amountOwed - finance.amountPaid).toFixed(2)}`
                          : 'Pago'}
                      </Text>
                    </View>
                    <Text style={styles.dueDate}>Vencimento: {finance.dueDate}</Text>
                    {finance.amountOwed > finance.amountPaid && (
                      <TouchableOpacity
                        style={styles.payButton}
                        onPress={() => handlePayment(finance)}
                      >
                        <Icon name="currency-usd" style={styles.dollarIcon} />
                        <Text style={styles.payButtonText}>Pagar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <IconButton
                    icon={props => <Icon name="delete" {...props} />}
                    onPress={() => handleDelete(finance.id)}
                  />
                </View>
              ))}
            </View>
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
    marginLeft: 15,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 15,
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 15,
  },
  financeDetails: {
    flex: 1,
  },
  idContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start'
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
  },
  dueDate: {
    fontSize: 16,
    marginVertical: 5,
  },
  amount: {
    alignSelf: 'flex-end',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  dollarIcon: {
    fontSize: 20,
    color: 'green',
    marginRight: 5,
  },
  payButtonText: {
    fontSize: 20,
    color: 'green',
  }
});

export default DetailFinance;
