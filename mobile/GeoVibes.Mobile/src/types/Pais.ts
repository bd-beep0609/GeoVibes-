export interface Pais {
  id: number;
  nombre: string;
  region: string;
  codigoIso: string;
  banderaUrl?: string;
  capital?: string;
  moneda?: string;
  idioma?: string;
  colorPrimario?: string;
  descripcionBreve?: string;
  aveNacional?: string;
  cultura?: {
    gastronomia?: string;
    musica?: string;
    patrimonio?: string;
    datoCurioso?: string;
  };
}
