import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export interface Favorito {
  id: number;
  usuarioId: number;
  paisId: number;
  paisNombre: string;
  paisBanderaUrl: string;
  fechaAgregado: string;
}

export const getFavoritos = async (): Promise<Favorito[]> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  console.log('🔍 usuarioId:', usuarioId);  // DEBUG

  if (!usuarioId) throw new Error('No hay usuario logueado');

  const response = await api.get(`/api/usuarios/${usuarioId}/favoritos`);
  return response.data;
};

export const eliminarFavorito = async (paisId: number): Promise<void> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  if (!usuarioId) throw new Error('No hay usuario logueado');

  await api.delete(`/api/usuarios/${usuarioId}/favoritos/${paisId}`);
};

export const agregarFavorito = async (paisId: number): Promise<void> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  if (!usuarioId) throw new Error('No hay usuario logueado');

  await api.post(`/api/usuarios/${usuarioId}/favoritos`, { paisId });
};