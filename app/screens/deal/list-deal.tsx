import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { AppBar, Button, IconButton, ListItem } from "@react-native-material/core";
import { Stack } from 'react-native-flex-layout';
import { Styles, Colors } from '@/constants';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from 'expo-router';
import { deleteDeal, getDeals } from '@/app/api/deal';
import { Deal } from '@/app/models/dealModel';

const ListDeal: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsList = await getDeals();
        setDeals(dealsList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDeals();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteDeal(id);
      setDeals(deals.filter(deal => deal.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Deal }) => (
    <ListItem
      title={`${item.description}`}
      secondaryText={`Preço: R$ ${item.price.toFixed(2)}\nIntervalo de Cobrança: ${item.chargeInterval} dias\nData de Início: ${item.startDate}\nData de Término: ${item.endDate}\nUnidade de Intervalo: ${item.intervalUnit}\nNúmero de Intervalos: ${item.intervalNumber}\nModalidades: ${item.modalities.map(mod => mod.name).join(', ')}`}
      trailing={props => (
        <Stack fill center spacing={3}>
          <IconButton
            icon={props => <Icon name="pencil" {...props} />}
            onPress={() => router.push(`/screens/deal/update-deal?id=${item.id}`)}
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
        title="Deals"
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
            onPress={() => router.push('/screens/deal/new-deal')}
          />
          <FlatList
            data={deals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default ListDeal;
