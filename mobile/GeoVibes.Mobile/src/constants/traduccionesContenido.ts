export const traduccionesContenido: any = {
  es: {
    // Países
    'México': 'México',
    'Canadá': 'Canadá',
    'Honduras': 'Honduras',
    'Guatemala': 'Guatemala',
    'Costa Rica': 'Costa Rica',
    'Argentina': 'Argentina',
    'Brasil': 'Brasil',
    'Perú': 'Perú',
    'Venezuela': 'Venezuela',
    'Colombia': 'Colombia',
    'Cuba': 'Cuba',
    'República Dominicana': 'República Dominicana',
    
    // Descripciones
    'Estados Unidos Mexicanos · Tierra del Águila Real': 'Estados Unidos Mexicanos · Tierra del Águila Real',
    'Canadá · Tierra del Loons': 'Canadá · Tierra del Loons',
    
    // Regiones
    'Norteamérica': 'Norteamérica',
    'Centroamérica': 'Centroamérica',
    'Sudamérica': 'Sudamérica',
    'Caribe': 'Caribe',
  },
  en: {
    // Países
    'México': 'Mexico',
    'Canadá': 'Canada',
    'Honduras': 'Honduras',
    'Guatemala': 'Guatemala',
    'Costa Rica': 'Costa Rica',
    'Argentina': 'Argentina',
    'Brasil': 'Brazil',
    'Perú': 'Peru',
    'Venezuela': 'Venezuela',
    'Colombia': 'Colombia',
    'Cuba': 'Cuba',
    'República Dominicana': 'Dominican Republic',
    
    // Descripciones
    'Estados Unidos Mexicanos · Tierra del Águila Real': 'United Mexican States · Land of the Golden Eagle',
    'Canadá · Tierra del Loons': 'Canada · Land of the Loons',
    
    // Regiones
    'Norteamérica': 'North America',
    'Centroamérica': 'Central America',
    'Sudamérica': 'South America',
    'Caribe': 'Caribbean',
  },
  pt: {
    // Países
    'México': 'México',
    'Canadá': 'Canadá',
    'Honduras': 'Honduras',
    'Guatemala': 'Guatemala',
    'Costa Rica': 'Costa Rica',
    'Argentina': 'Argentina',
    'Brasil': 'Brasil',
    'Perú': 'Peru',
    'Venezuela': 'Venezuela',
    'Colombia': 'Colômbia',
    'Cuba': 'Cuba',
    'República Dominicana': 'República Dominicana',
    
    // Descripciones
    'Estados Unidos Mexicanos · Tierra del Águila Real': 'Estados Unidos Mexicanos · Terra da Águia Real',
    'Canadá · Tierra del Loons': 'Canadá · Terra dos Loons',
    
    // Regiones
    'Norteamérica': 'América do Norte',
    'Centroamérica': 'América Central',
    'Sudamérica': 'América do Sul',
    'Caribe': 'Caribe',
  },
};

export const traducir = (texto: string | undefined | null, idioma: string): string => {
  if (!texto) return '';
  return traduccionesContenido[idioma]?.[texto] || texto;
};
