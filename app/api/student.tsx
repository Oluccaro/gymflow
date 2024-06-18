import axios from 'axios';
import { Student } from '../models/StudentModel'; // Import the Student type
import { API_URL } from './config';

export const getStudents = async (): Promise<Student[]> => {
  try {
    const response = await axios.get(`${API_URL}/student`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudentById = async (id: number): Promise<Student> => {
  try {
    const response = await axios.get(`${API_URL}/student/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStudent = async (student: Student): Promise<Student> => {
  try {
    const response = await axios.post(`${API_URL}/student`, student);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (id: number, student: Partial<Student>): Promise<Student> => {
  try {
    const response = await axios.put(`${API_URL}/student/${id}`, student);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/student/${id}`);
  } catch (error) {
    throw error;
  }
};
