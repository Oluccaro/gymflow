import axios from 'axios';
import { Deal } from '../models/dealModel';
import { API_URL } from './config';

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const response = await axios.get(`${API_URL}/deal`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDealById = async (id: number): Promise<Deal> => {
  try {
    const response = await axios.get(`${API_URL}/deal/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDeal = async (deal: Deal): Promise<Deal> => {
  try {
    const response = await axios.post(`${API_URL}/deal`, deal);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDeal = async (id: number, deal: Partial<Deal>): Promise<Deal> => {
  try {
    const response = await axios.put(`${API_URL}/deal/${id}`, deal);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDeal = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/deal/${id}`);
  } catch (error) {
    throw error;
  }
};
