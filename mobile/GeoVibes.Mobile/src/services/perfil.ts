import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export interface PerfilUpdate {
  nombreCompleto?: string;
  correo?: string;
  paisOrigen?: string;
}

export const actualizarPerfil = async (datos: PerfilUpdate): Promise<any> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  if (!usuarioId) throw new Error('No hay usuario logueado');

  const response = await api.put(`/api/usuarios/${usuarioId}`, datos);

  if (datos.nombreCompleto) {
    await AsyncStorage.setItem('nombreCompleto', datos.nombreCompleto);
  }
  if (datos.correo) {
    await AsyncStorage.setItem('correo', datos.correo);
  }
  if (datos.paisOrigen) {
    await AsyncStorage.setItem('paisOrigen', datos.paisOrigen);
  }

  return response.data;
};

export const cambiarPassword = async (
  passwordActual: string,
  passwordNueva: string
): Promise<any> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  if (!usuarioId) throw new Error('No hay usuario logueado');

  const response = await api.put(`/api/usuarios/${usuarioId}/password`, {
    passwordActual,
    passwordNueva,
  });

  return response.data;
};
