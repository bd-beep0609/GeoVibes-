import api from './api';

export interface Lugar {
  id: number;
  paisId: number;
  nombre: string;
  ciudad: string;
  descripcion?: string;
  motivoId?: number;
  motivoNombre?: string;
  categoriaId?: number;
  categoriaNombre?: string;
  categoriaIcono?: string;
  latitud?: number;
  longitud?: number;
  imagenUrl?: string;
}

export const getLugaresPorPais = async (paisId: number): Promise<Lugar[]> => {
  const response = await api.get(`/api/paises/${paisId}/lugares`);
  return response.data;
};
