import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AjustesContextData {
  idioma: string;
  tamanoFuente: string;
  cambiarIdioma: (idioma: string) => void;
  cambiarTamanoFuente: (tamano: string) => void;
  t: (key: string) => string;
  fontSize: (base: number) => number;
}

const AjustesContext = createContext<AjustesContextData>({} as AjustesContextData);

// Traducciones
const traducciones: any = {
  es: {
    // Tab bar
    explorar: 'Explorar',
    favoritos: 'Favoritos',
    miRuta: 'Mi Ruta',
    perfil: 'Perfil',
    // Home
    encuentraDestino: 'Encuentra tu próximo destino',
    buscarPais: 'Buscar país...',
    todos: 'Todos',
    norteamerica: 'Norteamérica',
    centroamerica: 'Centroamérica',
    sudamerica: 'Sudamérica',
    caribe: 'Caribe',
    paisesDeAmerica: 'Países de América',
    // Detalle
    volver: '← Volver',
    capital: 'Capital',
    moneda: 'Moneda',
    ave: 'Ave',
    cultura: 'Cultura',
    explorarPais: '¡Explorar',
    agregarRuta: 'Agregar a Mi Ruta',
    enRuta: 'En Mi Ruta',
    // Perfil
    miPerfil: 'Mi Perfil',
    misFavoritos: 'Mis Favoritos',
    panelAdmin: 'Panel de Admin',
    ajustes: 'Ajustes',
    cerrarSesion: 'Cerrar Sesión',
    administrador: 'Administrador',
    viajero: 'Viajero',
    // Ajustes
    idioma: 'Idioma',
    tamanoFuente: 'Tamaño de Fuente',
    acercaDe: 'Acerca de',
    pequeno: 'Pequeño',
    mediano: 'Mediano',
    grande: 'Grande',
    version: 'Versión 1.0.0',
    equipoDesarrollo: 'Equipo de Desarrollo',
    descripcionApp: 'Aplicación móvil para explorar los países de América.',
    // Favoritos
    noFavoritos: 'No tienes favoritos',
    exploraPaises: 'Explora países y guarda tus favoritos',
    // Mi Ruta
    noRuta: 'Aún no tienes destinos',
    exploraPaisesRuta: 'Explora países y márcalos como visitados',
    // Lugares
    lugaresTuristicos: 'Lugares Turísticos',
    mejoresLugares: 'Los mejores lugares para visitar',
    // Login
    bienvenido: 'Bienvenido',
    iniciaSesion: 'Inicia sesión para continuar',
    correo: 'Correo electrónico',
    contrasena: 'Contraseña',
    iniciarSesion: 'Iniciar Sesión',
    noTienesCuenta: '¿No tienes cuenta? Regístrate',
  },
  en: {
    // Tab bar
    explorar: 'Explore',
    favoritos: 'Favorites',
    miRuta: 'My Route',
    perfil: 'Profile',
    // Home
    encuentraDestino: 'Find your next destination',
    buscarPais: 'Search country...',
    todos: 'All',
    norteamerica: 'North America',
    centroamerica: 'Central America',
    sudamerica: 'South America',
    caribe: 'Caribbean',
    paisesDeAmerica: 'Countries of America',
    // Detalle
    volver: '← Back',
    capital: 'Capital',
    moneda: 'Currency',
    ave: 'Bird',
    cultura: 'Culture',
    explorarPais: 'Explore',
    agregarRuta: 'Add to My Route',
    enRuta: 'In My Route',
    // Perfil
    miPerfil: 'My Profile',
    misFavoritos: 'My Favorites',
    panelAdmin: 'Admin Panel',
    ajustes: 'Settings',
    cerrarSesion: 'Log Out',
    administrador: 'Administrator',
    viajero: 'Traveler',
    // Ajustes
    idioma: 'Language',
    tamanoFuente: 'Font Size',
    acercaDe: 'About',
    pequeno: 'Small',
    mediano: 'Medium',
    grande: 'Large',
    version: 'Version 1.0.0',
    equipoDesarrollo: 'Development Team',
    descripcionApp: 'Mobile app to explore the countries of America.',
    // Favoritos
    noFavoritos: 'You have no favorites',
    exploraPaises: 'Explore countries and save your favorites',
    // Mi Ruta
    noRuta: 'You have no destinations yet',
    exploraPaisesRuta: 'Explore countries and mark them as visited',
    // Lugares
    lugaresTuristicos: 'Tourist Places',
    mejoresLugares: 'The best places to visit',
    // Login
    bienvenido: 'Welcome',
    iniciaSesion: 'Sign in to continue',
    correo: 'Email',
    contrasena: 'Password',
    iniciarSesion: 'Sign In',
    noTienesCuenta: "Don't have an account? Sign Up",
  },
  pt: {
    // Tab bar
    explorar: 'Explorar',
    favoritos: 'Favoritos',
    miRuta: 'Minha Rota',
    perfil: 'Perfil',
    // Home
    encuentraDestino: 'Encontre seu próximo destino',
    buscarPais: 'Buscar país...',
    todos: 'Todos',
    norteamerica: 'América do Norte',
    centroamerica: 'América Central',
    sudamerica: 'América do Sul',
    caribe: 'Caribe',
    paisesDeAmerica: 'Países da América',
    // Detalle
    volver: '← Voltar',
    capital: 'Capital',
    moneda: 'Moeda',
    ave: 'Pássaro',
    cultura: 'Cultura',
    explorarPais: 'Explorar',
    agregarRuta: 'Adicionar à Minha Rota',
    enRuta: 'Na Minha Rota',
    // Perfil
    miPerfil: 'Meu Perfil',
    misFavoritos: 'Meus Favoritos',
    panelAdmin: 'Painel Admin',
    ajustes: 'Configurações',
    cerrarSesion: 'Sair',
    administrador: 'Administrador',
    viajero: 'Viajante',
    // Ajustes
    idioma: 'Idioma',
    tamanoFuente: 'Tamanho da Fonte',
    acercaDe: 'Sobre',
    pequeno: 'Pequeno',
    mediano: 'Médio',
    grande: 'Grande',
    version: 'Versão 1.0.0',
    equipoDesarrollo: 'Equipe de Desenvolvimento',
    descripcionApp: 'Aplicativo móvel para explorar os países da América.',
    // Favoritos
    noFavoritos: 'Você não tem favoritos',
    exploraPaises: 'Explore países e salve seus favoritos',
    // Mi Ruta
    noRuta: 'Você ainda não tem destinos',
    exploraPaisesRuta: 'Explore países e marque-os como visitados',
    // Lugares
    lugaresTuristicos: 'Pontos Turísticos',
    mejoresLugares: 'Os melhores lugares para visitar',
    // Login
    bienvenido: 'Bem-vindo',
    iniciaSesion: 'Faça login para continuar',
    correo: 'E-mail',
    contrasena: 'Senha',
    iniciarSesion: 'Entrar',
    noTienesCuenta: 'Não tem uma conta? Registre-se',
  },
};

export const AjustesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [idioma, setIdioma] = useState('es');
  const [tamanoFuente, setTamanoFuente] = useState('mediano');

  useEffect(() => {
    cargarPreferencias();
  }, []);

  const cargarPreferencias = async () => {
    try {
      const prefs = await AsyncStorage.getItem('ajustes');
      if (prefs) {
        const data = JSON.parse(prefs);
        setIdioma(data.idioma || 'es');
        setTamanoFuente(data.tamanoFuente || 'mediano');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cambiarIdioma = async (nuevoIdioma: string) => {
    setIdioma(nuevoIdioma);
    const prefs = await AsyncStorage.getItem('ajustes');
    const data = prefs ? JSON.parse(prefs) : {};
    await AsyncStorage.setItem('ajustes', JSON.stringify({ ...data, idioma: nuevoIdioma }));
  };

  const cambiarTamanoFuente = async (nuevoTamano: string) => {
    setTamanoFuente(nuevoTamano);
    const prefs = await AsyncStorage.getItem('ajustes');
    const data = prefs ? JSON.parse(prefs) : {};
    await AsyncStorage.setItem('ajustes', JSON.stringify({ ...data, tamanoFuente: nuevoTamano }));
  };

  const t = (key: string): string => {
    return traducciones[idioma]?.[key] || key;
  };

  const fontSize = (base: number): number => {
    if (tamanoFuente === 'pequeno') return base * 0.85;
    if (tamanoFuente === 'grande') return base * 1.25;
    return base;
  };

  return (
    <AjustesContext.Provider
      value={{
        idioma,
        tamanoFuente,
        cambiarIdioma,
        cambiarTamanoFuente,
        t,
        fontSize,
      }}
    >
      {children}
    </AjustesContext.Provider>
  );
};

export const useAjustes = () => {
  const context = useContext(AjustesContext);
  if (!context) {
    throw new Error('useAjustes debe usarse dentro de AjustesProvider');
  }
  return context;
};
