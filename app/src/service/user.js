import {instance} from './instance';

export const testAPI = async () => {
  const response = await instance.get('/api/test');
  return response.data;
};

// 카카오에서 발급 받은 인가코드를 담아서 post
export const kakaoapi = async (code) => {
  try {
    const response = await instance.post('/api/login/kakao', { code });
    return response.data;
  } catch (error) {
    console.error('Error during Kakao login API call', error);
    throw error;
  }
};