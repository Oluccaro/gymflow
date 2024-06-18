import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';
import { loginModel } from '../models/loginModel';

export const login = async (login : loginModel)  => {
  try {
    const response = await axios.post(`${API_URL}/login`, login);
    const loggedUser = response.data;
    await AsyncStorage.setItem('user', JSON.stringify(loggedUser));
    return { ...loggedUser};
  } catch (error) {
    throw error;
  }
};