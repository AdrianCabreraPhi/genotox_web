import apiClient from './apiClient.tsx';

export const query = async (formData: any) => {
    return await apiClient.post('/api/query/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  };