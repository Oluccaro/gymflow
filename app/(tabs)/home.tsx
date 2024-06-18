import React from 'react';
import { View } from 'react-native';
import { Button } from "@react-native-material/core";
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
   <View style={Styles.container}>
        <VStack m={20} spacing={12}>
          <HStack spacing={14}>
              <Button title="Alunos"
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
              <Button title="Pagamento"
              style={[Styles.pillButton]}
              leading={props => <Icon name="plus" {...props}/>}
              onPress={()=>handlePress('/screens/finance/new-payment')}
            />
          </HStack>
       </VStack>
   </View>
);
};



export default HomeScreen;