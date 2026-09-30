import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { getLugaresPorPais, Lugar } from '../../services/lugares';
import { useAjustes } from '../../context/AjustesContext';
import { traducir } from '../../constants/traduccionesContenido';

export default function LugaresScreen() {
  const { paisId, paisNombre, colorPrimario, colorSecundario } = useLocalSearchParams<{
    paisId: string;
    paisNombre: string;
    colorPrimario: string;
    colorSecundario: string;
  }>();

  const { t, idioma } = useAjustes();
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [loading, setLoading] = useState(true);

  const primary = colorPrimario || '#0033A0';
  const secondary = colorSecundario || '#001A52';

  useEffect(() => {
    cargarLugares();
  }, [paisId, idioma]);

  const cargarLugares = async () => {
    try {
      const data = await getLugaresPorPais(Number(paisId));
      setLugares(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los lugares turísticos');
    } finally {
      setLoading(false);
    }
  };

  const renderLugar = ({ item }: { item: Lugar }) => (
    <View style={styles.lugarCard}>
      {item.imagenUrl ? (
        <Image source={{ uri: item.imagenUrl }} style={styles.lugarImage} resizeMode="cover" />
      ) : (
        <View style={[styles.lugarImagePlaceholder, { backgroundColor: primary }]}>
          {item.categoriaIcono ? (
            <Text style={styles.placeholderIcon}>{item.categoriaIcono}</Text>
          ) : (
            <FontAwesome5 name="map-marker-alt" size={40} color="#FFFFFF" style={styles.placeholderIcon} />
          )}
        </View>
      )}
      <View style={styles.lugarInfo}>
        <View style={styles.lugarHeader}>
          <Text style={styles.lugarNombre}>{traducir(item.nombre, idioma)}</Text>
          {item.categoriaIcono && (
            <Text style={styles.categoriaIcono}>{item.categoriaIcono}</Text>
          )}
        </View>
        <Text style={styles.lugarCiudad}><FontAwesome5 name="map-marker-alt" size={14} color="#666" /> {traducir(item.ciudad, idioma)}</Text>
        {item.categoriaNombre && (
          <View style={[styles.categoriaBadge, { backgroundColor: primary + '20' }]}>
            <Text style={[styles.categoriaText, { color: primary }]}>{traducir(item.categoriaNombre, idioma)}</Text>
          </View>
        )}
        {item.descripcion && (
          <Text style={styles.lugarDescripcion} numberOfLines={3}>{traducir(item.descripcion, idioma)}</Text>
        )}
      </View>
    </View>
  );

  const gradientColors: [string, string, string] = [primary, '#FFFFFF', secondary];

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>{t('volver')}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}><FontAwesome5 name="map-marked-alt" size={24} color="#FFFFFF" /> {t('explorarPais')} {traducir(paisNombre, idioma)}!</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primary} />
        </View>
      ) : lugares.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome5 name="umbrella-beach" size={60} color="#666" style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Sin lugares aún</Text>
          <Text style={styles.emptySubtitle}>
            No hay lugares turísticos registrados para {paisNombre}.
          </Text>
        </View>
      ) : (
        <FlatList
          data={lugares}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLugar}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerBar: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  backButton: { marginBottom: 8 },
  backText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: { fontSize: 60, marginBottom: 15 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  emptySubtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  listContent: { padding: 20, paddingBottom: 40 },
  lugarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lugarImage: {
    width: '100%',
    height: 160,
  },
  lugarImagePlaceholder: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: { fontSize: 40 },
  lugarInfo: { padding: 15 },
  lugarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  lugarNombre: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a', flex: 1 },
  categoriaIcono: { fontSize: 20, marginLeft: 8 },
  lugarCiudad: { fontSize: 14, color: '#666', marginBottom: 8 },
  categoriaBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  categoriaText: { fontSize: 12, fontWeight: '600' },
  lugarDescripcion: { fontSize: 14, color: '#444', lineHeight: 20 },
});
