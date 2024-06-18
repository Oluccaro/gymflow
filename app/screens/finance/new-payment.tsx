import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AppBar, IconButton, TextInput, Button } from "@react-native-material/core";
import { VStack } from 'react-native-flex-layout';
import { Styles } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const NewPayment = () => {
    const studentId = '1';
    const studentName = 'Alice Smith';
    const [dueDate, setDueDate] = useState('');
    const [amountOwed, setAmountOwed] = useState('');
    const [amountPaid, setAmountPaid] = useState('');

    const handleCadastro = () => {
        console.log('student: ', studentId);
        console.log('data: ', dueDate);
        console.log('deve: ', amountOwed);
        console.log('pago: ', amountPaid);
    };

    return (
        <View style={{ flex: 1 }}>
            <AppBar
                title="Cadastrar Pagamentos"
                style={Styles.appBar}
                leading={props => (
                    <IconButton
                        icon={props => <Icon name="arrow-left" {...props} />}
                        {...props}
                    />
                )}
            />
            <ScrollView>
                <View style={Styles.container}>
                    <View style={Styles.inputContainer}>
                        <VStack m={15} spacing={10}>
                            <View style={styles.profileContainer}>
                                <IconButton
                                  icon={() => <Icon name="account-circle" size={60} />}
                                  onPress={handleCadastro}
                                />
                                <View>
                                    <Text style={[styles.subtitle, { color: 'gray' }]}>Nome do titular</Text>
                                    <Text style={styles.title}>{studentName}</Text>
                                </View>
                            </View>
                        </VStack>
                    </View>
                    <Text style={[styles.title, { color: 'white', marginLeft: 15 }]}>DETALHES:</Text>
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
                            />
                            <TextInput
                                placeholder="Valor pago (R$)"
                                value={amountPaid}
                                onChangeText={setAmountPaid}
                            />
                            <Button
                              title="Confirmar novo Pagamento"
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
