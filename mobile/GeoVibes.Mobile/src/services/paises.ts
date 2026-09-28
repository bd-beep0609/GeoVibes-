import api from './api';
import { Pais } from '../types/Pais';

export const getPaises = async (region?: string, search?: string): Promise<Pais[]> => {
  let params: any = {};
  if (region && region !== 'Todos') {
    params.region = region;
  }
  if (search) {
    params.search = search;
  }
  
  const response = await api.get('/api/paises', { params });
  return response.data;
};

export const getPais = async (id: number): Promise<Pais> => {
  const response = await api.get(`/api/paises/${id}`);
  return response.data;
};

export const getDetallePais = async (id: number): Promise<Pais> => {
  const response = await api.get(`/api/paises/${id}`);
  return response.data;
};
