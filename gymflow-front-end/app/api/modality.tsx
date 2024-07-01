import axios from 'axios';
import { Modality } from '../models/modalityModel';
import { API_URL } from './config';

export const getModalities = async (): Promise<Modality[]> => {
  try {
    const response = await axios.get(`${API_URL}/modality`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getModalityById = async (id: number): Promise<Modality> => {
  try {
    const response = await axios.get(`${API_URL}/modality/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createModality = async (modality: Modality): Promise<Modality> => {
  try {
    const response = await axios.post(`${API_URL}/modality`, modality);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateModality = async (id: number, modality: Partial<Modality>): Promise<Modality> => {
  try {
    const response = await axios.put(`${API_URL}/modality/${id}`, modality);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteModality = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/modality/${id}`);
  } catch (error) {
    throw error;
  }
};
