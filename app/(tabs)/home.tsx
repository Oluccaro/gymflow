import React from 'react';
import { View } from 'react-native';
import { AppBar, Button, IconButton, TextInput, ListItem  } from "@react-native-material/core";
import { HStack, VStack } from 'react-native-flex-layout';
import { Styles } from '@/constants';
import { useRouter} from 'expo-router';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const HomeScreen =() => {
  const router = useRouter();

  const handlePress = (path : string) => {
    router.push(path);
  };

  return (
  <View style={{ flex: 1 }}>
   <AppBar
                  title="Home"
                  style={Styles.appBar}
                  leading={props => (
                    <IconButton
                      icon={props => <Icon name="blank" {...props} />}
                      onPress={()=> router.back()}
                      {...props}/>
                  )}
         />
   <View style={Styles.container}>
        <VStack m={20} spacing={12}>
          <HStack spacing={14}>
              <Button title="Alunos"
              style={[Styles.button]}
              onPress={() => handlePress('/screens/student/list-student')}
              />
              <Button title="Modalidades"
              style={[Styles.button]}
              onPress={()=>handlePress('/screens/modality/list-modality')}
              />
          </HStack>
          <HStack spacing={12}>
              <Button title="Planos"
              style={[Styles.button]}
              onPress={()=> handlePress('/screens/deal/list-deal')}
              />
              <Button title="Financeiro"
              style={[Styles.button]}
              onPress={()=> handlePress('/screens/finance/list-finance')}
              />
          </HStack>
          </VStack>
          <VStack m={40} spacing={10}>
            <HStack spacing={12}>
              <Button title="Novo Aluno"
                style={[Styles.pillButton]}
                leading={props => <Icon name="plus" {...props}/>}
                onPress={()=>handlePress('/screens/student/create-student')}  
              />
          </HStack>
       </VStack>
   </View>
  </View>
);
};



export default HomeScreen;