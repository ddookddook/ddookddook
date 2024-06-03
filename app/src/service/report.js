import { instance } from './instance';

export const chat = async () => {
  try {
    const response = await instance.get('/api/chats');
    if (response.data.success) {
      return response.data.response;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching chat data:', error);
    throw error;
  }
};
