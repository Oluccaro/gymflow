import { Colors, Icons, Styles } from '@/constants';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { AppBar, IconButton } from '@react-native-material/core';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ConfirmedPayment = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <AppBar
        title="Pagamento Confirmado"
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
      <TouchableOpacity style={styles.buttonSession} onPress={()=> router.replace("screens/finance/list-finance")}>
          <Image 
            source={Icons.confirmed} 
            style={styles.qrCodeIcon} 
          />
          <Text style={styles.qrCodeText}>Pagamento Confirmado</Text>
      </TouchableOpacity>
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
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    width: '80%',
  },
  qrCodeIcon:{
    width: 200,
    height: 200,
    padding: '10%'
  },
  qrCodeText: {
    color: Colors.backgroundMain,
    fontSize: 18,
  },
});

export default ConfirmedPayment;
