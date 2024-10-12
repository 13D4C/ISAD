// api/scheduleApi.ts

import axios from 'axios';
import { SubjectData } from '../components/interface';

const API_URL = 'http://localhost:8888/api'; // Adjust this to your server's URL

export const createSchedule = async (userId: string, subjects: SubjectData[]) => {
  try {
    const response = await axios.post(`${API_URL}/schedule/create`, { userId, subjects });
    return response.data;
  } catch (error) {
    console.error('Error creating schedule:', error);
    throw error;
  }
};

export const getSchedule = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/schedule/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schedule:', error);
    throw error;
  }
};

export const updateSchedule = async (userId: string, subjects: SubjectData[]) => {
  try {
    const response = await axios.put(`${API_URL}/schedule/${userId}`, { subjects });
    return response.data;
  } catch (error) {
    console.error('Error updating schedule:', error);
    throw error;
  }
};

export const deleteSchedule = async (userId: string, scheduleId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/schedule/${userId}/${scheduleId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    throw error;
  }
};