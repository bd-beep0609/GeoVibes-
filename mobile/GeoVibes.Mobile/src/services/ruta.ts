import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export interface RutaItem {
  id: number;
  usuarioId: number;
  paisId: number;
  paisNombre: string;
  paisBanderaUrl: string;
  paisCapital: string;
  fechaVisita: string;
}

export const getRuta = async (): Promise<RutaItem[]> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  if (!usuarioId) throw new Error('No hay usuario logueado');

  const response = await api.get(`/api/usuarios/${usuarioId}/ruta`);
  return response.data;
};

export const agregarVisita = async (paisId: number): Promise<void> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  if (!usuarioId) throw new Error('No hay usuario logueado');

  await api.post(`/api/usuarios/${usuarioId}/ruta`, { paisId });
};

export const eliminarVisita = async (paisId: number): Promise<void> => {
  const usuarioId = await AsyncStorage.getItem('usuarioId');
  if (!usuarioId) throw new Error('No hay usuario logueado');

  await api.delete(`/api/usuarios/${usuarioId}/ruta/${paisId}`);
};
