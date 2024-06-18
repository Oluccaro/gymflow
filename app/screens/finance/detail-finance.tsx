import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { AppBar, IconButton } from "@react-native-material/core";
import { Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailFinance = () => {
  //const route = useRoute();
  //const navigation = useNavigation();
  //const { name } = route.params;
  const name = 'Alice Smith';  // Nome do aluno

  const finances = [
      { id: 1, dueDate: '2024-07-01', amountOwed: 100, amountPaid: 50 },
      { id: 2, dueDate: '2024-08-01', amountOwed: 200, amountPaid: 200 },
      { id: 3, dueDate: '2024-09-01', amountOwed: 150, amountPaid: 100 },
  ];

  const handleDelete = (id) => {
      Alert.alert('Excluir', `Tem certeza que deseja excluir a conta ${id}?`, [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Excluir', onPress: () => console.log('Excluído:', id) }
      ]);
  };

  const handlePayment = (finances) => {
    console.log('Mudando de tela:', finances.id);
      // Aqui você pode adicionar a lógica de navegação
      //navigation.navigate('Payment', { finances.id });
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
            //onPress={() => navigation.goBack()}
          />
        )}
      />
      <ScrollView>
        <View style={Styles.container}>
          <View style={Styles.inputContainer}>
            <Text style={styles.title}>{name}</Text>
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
