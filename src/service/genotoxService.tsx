import apiClient from './apiClient.tsx';

export const query = async (formData: any) => {
    return await apiClient.post('/api/process/', formData);
  };

