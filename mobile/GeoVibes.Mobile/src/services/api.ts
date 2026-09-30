import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://geovibes-api.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const prefs = await AsyncStorage.getItem('ajustes');
    if (prefs) {
      const { idioma } = JSON.parse(prefs);
      if (idioma) {
        config.headers['Accept-Language'] = idioma;
      }
    }
  } catch (e) {
    // ignorar error de lectura
  }

  return config;
});

export default api;