import axios from 'axios';
import { DownloadResponse } from '@/src/types';

// TODO: Replace with your actual backend API URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const downloadVideo = async (url: string): Promise<DownloadResponse> => {
  try {
    const response = await apiClient.post('/download', { url });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Failed to download video',
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
};

