import { Colors, Icons, Styles } from '@/constants';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { AppBar, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const CheckPayment = () => {

  const handlePayment = () => {
    Alert.alert('Confirmar pagamento', `Tem certeza que deseja confirmar o pagamento?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Confirmar',
        onPress: () => {
          router.push(`/screens/finance/confirmed-payment`);
        }
      }
    ]);
  };

  const router = useRouter();
  return (
    <View style={styles.container}>
      <AppBar
        title="Pagamentos"
        style={Styles.appBar}
        leading={props => (
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
            onPress={() => router.back()}
            {...props}
          />
        )}
      />
      <View style={styles.topSection}>
        <Image 
          source={Icons.profile} 
          style={styles.icon} 
        />
        <Text style={styles.name}>Juca Bala</Text>
      </View>

      <View style={styles.amountSection}>
        <Text style={styles.amount}>R$123.45</Text>
        <Text style={styles.amountLabel}>Total a Pagar</Text>
      </View>
      <View style={styles.buttonSession}>
        <TouchableOpacity style={styles.button} onPress={()=> router.push('/screens/finance/detail-payment')}>
          <Image 
            source={Icons.pixIcon} 
            style={styles.pixLogo} 
          />
          <Text style={styles.buttonText}>Pagar com PIX</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={()=> handlePayment()}>
          <Text style={styles.buttonText}>Marcar como Pago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundMain,
  },
  buttonSession:{
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGray
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white
  },
  amountSection: {
    width: '100%',
    padding: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginBottom: 40,
  },
  amountLabel: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 5,
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundMain,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  pixLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
  },
});

export default CheckPayment;
