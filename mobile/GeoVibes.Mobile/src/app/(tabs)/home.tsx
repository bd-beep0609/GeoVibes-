import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { getPaises } from '../../services/paises';
import { Pais } from '../../types/Pais';
import { useAjustes } from '../../context/AjustesContext';
import { traducir } from '../../constants/traduccionesContenido';

const REGIONS = ['todos', 'norteamerica', 'centroamerica', 'sudamerica', 'caribe'];

export default function HomeScreen() {
  const { t, idioma } = useAjustes();
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('todos');

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPaises();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, selectedRegion, idioma]);

  const fetchPaises = async () => {
    setLoading(true);
    try {
      const regionForApi = selectedRegion === 'todos' ? 'Todos' :
        selectedRegion === 'norteamerica' ? 'Norteamérica' :
          selectedRegion === 'centroamerica' ? 'Centroamérica' :
            selectedRegion === 'sudamerica' ? 'Sudamérica' : 'Caribe';
      const data = await getPaises(regionForApi, search);
      setPaises(data);
    } catch (error) {
      console.error('Error fetching paises:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPais = ({ item }: { item: Pais }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/detalle/${item.id}`)}
    >
      <Image
        source={{ uri: item.banderaUrl || 'https://via.placeholder.com/150' }}
        style={styles.flag}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.countryName}>{traducir(item.nombre, idioma)}</Text>
        <Text style={styles.countryRegion}>{traducir(item.region, idioma)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('explorar')}</Text>
        <Text style={styles.subtitle}>{t('encuentraDestino')}</Text>

        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={18} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('buscarPais')}
            placeholderTextColor="#666"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.filtersContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={REGIONS}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedRegion === item && styles.filterButtonActive
                ]}
                onPress={() => setSelectedRegion(item)}
              >
                <Text style={[
                  styles.filterText,
                  selectedRegion === item && styles.filterTextActive
                ]}>
                  {t(item)}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View style={styles.gridContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
        ) : (
          <FlatList
            data={paises}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            renderItem={renderPais}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            columnWrapperStyle={styles.columnWrapper}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0033A0',
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#0033A0',
  },
  gridContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  loader: {
    marginTop: 50,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: '48%',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  flag: {
    width: '100%',
    height: 100,
    backgroundColor: '#E0E0E0',
  },
  cardContent: {
    padding: 12,
  },
  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0033A0',
    marginBottom: 4,
  },
  countryRegion: {
    fontSize: 12,
    color: '#666666',
  }
});