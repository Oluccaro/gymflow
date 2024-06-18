import React, { useState }from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppBar, Button, IconButton, TextInput  } from "@react-native-material/core";
import { Stack, HStack, VStack } from 'react-native-flex-layout';
import { Styles, Images, Colors } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { Router, Scene } from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const ListFinance = () => {
    const [search, setSearch] = useState('');
    const [names, setNames] = useState([
        { name: 'Alice Smith', haveOpenDebt: true },
        { name: 'Bob Johnson', haveOpenDebt: false },
        { name: 'Charlie Rose', haveOpenDebt: true },
        { name: 'Diana Moore', haveOpenDebt: false }
    ]);

    const handleSearch = () => {
        console.log('Searching for:', search);
        // Aqui você pode adicionar a lógica de pesquisa
    };

    const handleDetailsClick = (name) => {
        console.log('Clicked details for:', name);
        // Aqui você pode adicionar a lógica para exibir detalhes
    };

    return (
        <View style={{ flex: 1 }}>
            <AppBar
                title="Financeiro"
                style={Styles.appBar}
                leading={props => (
                    <IconButton
                      icon={props => <Icon name="arrow-left" {...props} />}
                      onPress={()=> router.pop()}
                      {...props}/>

                    )}
            />
            <ScrollView>
                <View style={Styles.container}>
                    <View style={Styles.inputContainer}>
                        <VStack m={15} spacing={10}>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    placeholder="Pesquisar aluno"
                                    value={search}
                                    onChangeText={setSearch}
                                    style={styles.searchInput}
                                />
                                <IconButton
                                    icon={props => <Icon name="magnify" {...props} />}
                                    onPress={handleSearch}
                                />
                            </View>
                        </VStack>
                    </View>
                    <View style={styles.spacer} />
                    <View style={Styles.inputContainer}>
                        <VStack m={15} spacing={10}>
                            <View style={styles.listContainer}>
                                {names.map((item, index) => (
                                    <View key={index} style={styles.listItem}>
                                        <TouchableOpacity onPress={() => handleDetailsClick(item.name)} style={styles.detailsContainer}>
                                            <Text style={styles.listItemText}>{item.name}</Text>
                                            <Text style={styles.listItemSubText}>clique para detalhes</Text>
                                        </TouchableOpacity>
                                        <IconButton
                                            icon={props => (
                                                <Icon 
                                                    name="currency-usd" 
                                                    {...props} 
                                                    style={{ color: item.haveOpenDebt ? 'red' : 'green' }}
                                                />
                                            )}
                                            onPress={() => handleDetailsClick(item.name)}
                                        />
                                    </View>
                                ))}
                            </View>
                            <Button
                                title="+ Novo pagamento"
                                style={Styles.button}
                                // onPress={NewPayment}
                            />
                        </VStack>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
    },
    spacer: {
        height: 20,
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
    },
    detailsContainer: {
        flex: 1,
    },
    listItemText: {
        fontSize: 16,
    },
    listItemSubText: {
        fontSize: 12,
        color: '#888',
    },
});

export default ListFinance;