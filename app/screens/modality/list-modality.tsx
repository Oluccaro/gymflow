import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AppBar, Button, IconButton, ListItem } from "@react-native-material/core";
import { Stack } from 'react-native-flex-layout';
import { Styles, Colors } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import { deleteModality, getModalities } from '@/app/api/modality';
import { Modality } from '@/app/models/modalityModel';

const ListModality: React.FC = () => {
  const [modalities, setModalities] = useState<Modality[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchModalities = async () => {
      try {
        const modalitiesList = await getModalities();
        setModalities(modalitiesList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchModalities();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteModality(id);
      setModalities(modalities.filter(modality => modality.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Modality }) => (
    <ListItem
      title={item.name}
      secondaryText={`Descrição: ${item.description}\nBenefícios para a Saúde: ${item.healthBenefits}`}
      trailing={props => (
        <Stack fill center spacing={3}>
          <IconButton
            icon={props => <Icon name="pencil" {...props} />}
            onPress={() => router.push(`/screens/modality/update-modality?id=${item.id}`)}
            {...props}
          />
          <IconButton
            icon={props => <Icon name="delete" {...props} />}
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
        title="Modalidades"
        style={Styles.appBar}
        leading={props => (
          <IconButton
            icon={props => <Icon name="arrow-left" {...props} />}
            onPress={() => router.back()}
            {...props}
          />
        )}
      />
      <View style={Styles.container}>
        <SafeAreaView style={Styles.listContainer}>
          <Button
            title="Adicionar"
            style={Styles.searchButton}
            leading={props => <Icon name="plus" {...props} />}
            onPress={() => router.push('/screens/modality/new-modality')}
          />
          <FlatList
            data={modalities}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default ListModality;
