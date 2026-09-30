import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_URL = 'https://geovibes-api.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
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
