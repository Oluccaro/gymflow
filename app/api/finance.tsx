import axios from 'axios';
import { Student } from '../models/StudentModel'; // Import the Student type
import { Finance } from '../models/financeModel';
import { API_URL } from './config';
import { StudentWithDebt } from '../models/studentWithDebtModel';

export const getFinanceById = async (id: number): Promise<Finance> => {
  try {
    const response = await axios.get(`${API_URL}/finance/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFinanceByStudentId = async (id: number): Promise<Finance[]> => {
    try {
      const response = await axios.get(`${API_URL}/finance/student/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const getStudentsWithDebts = async (): Promise<StudentWithDebt[]> => {
    try {
      const response = await axios.get(`${API_URL}/finance/students_with_debts`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const createFinance = async (finance: Finance): Promise<Finance> => {
  try {
    const response = await axios.post(`${API_URL}/finance`, finance);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFinance = async (id: number, finance: Partial<Finance>): Promise<Student> => {
  try {
    const response = await axios.put(`${API_URL}/finance/${id}`, finance);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFinance = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/finance/${id}`);
  } catch (error) {
    throw error;
  }
};
