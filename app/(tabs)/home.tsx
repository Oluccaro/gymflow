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
                  title="Alunos"
                  style={Styles.appBar}
                  leading={props => (
                    <IconButton
                      icon={props => <Icon name="arrow-left" {...props} />}
                      onPress={()=> router.pop()}
                      {...props}/>
                  )}
         />
   <View style={Styles.container}>
        <VStack m={20} spacing={12}>
          <HStack spacing={14}>
              <Button title="Menu"
              style={[Styles.button]}
              onPress={() => handlePress('/screens/student/list-student')}
              />
              <Button title="Planos"
              style={[Styles.button]}
              onPress={()=> handlePress('/screens/deal/list-deal')}
              />
          </HStack>
          <HStack spacing={12}>
              <Button title="Atividades"
              style={[Styles.button]}
              onPress={()=>handlePress('/screens/activity/list-activity')}
              />
              <Button title="Funcionários"
              style={[Styles.button]}
              onPress={() => handlePress('/screens/employee/list-employee')}
              />
          </HStack>
          <HStack spacing={12}>
            <Button title="Financeiro"
            style={[Styles.button]}
            onPress={()=> handlePress('/screens/finance/detail-finance?2')}
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
              <Button title="Pagamento"
              style={[Styles.pillButton]}
              leading={props => <Icon name="plus" {...props}/>}
              onPress={()=>handlePress('/screens/finance/new-payment')}
            />
          </HStack>
       </VStack>
   </View>
  </View>
);
};



export default HomeScreen;