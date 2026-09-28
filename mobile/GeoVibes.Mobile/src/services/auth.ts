import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export const login = async (correo: string, password: string) => {
  const response = await api.post('/api/usuarios/login', { correo, password });
  const { token, id, nombreCompleto, rol, correo: correoUsuario } = response.data;

  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('usuarioId', id.toString());
  await AsyncStorage.setItem('nombreCompleto', nombreCompleto);
  await AsyncStorage.setItem('rol', rol);
  await AsyncStorage.setItem('correo', correoUsuario || correo);  // 👈 AGREGAR

  return response.data;
};

export const registro = async (
  nombreCompleto: string,
  correo: string,
  paisOrigen: string,
  password: string

) => {
  const response = await api.post('/api/usuarios', {
    nombreCompleto,
    correo,
    paisOrigen,
    password,
  });
  const { token, id, rol } = response.data;

  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('usuarioId', id.toString());
  await AsyncStorage.setItem('nombreCompleto', nombreCompleto);
  await AsyncStorage.setItem('rol', rol);
  await AsyncStorage.setItem('correo', correo);  // 👈 AGREGAR

  return response.data;
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('usuarioId');
  await AsyncStorage.removeItem('nombreCompleto');
  await AsyncStorage.removeItem('rol');
  await AsyncStorage.removeItem('correo');  // 👈 AGREGAR
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getUsuarioId = async () => {
  const id = await AsyncStorage.getItem('usuarioId');
  return id ? parseInt(id) : null;
};