import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { getRuta, eliminarVisita, RutaItem } from '../../services/ruta';

export default function MiRutaScreen() {
  const [ruta, setRuta] = useState<RutaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      cargarRuta();
    }, [])
  );

  const cargarRuta = async () => {
    setLoading(true);
    try {
      const data = await getRuta();
      setRuta(data);
    } catch (error) {
      console.error('Error fetching ruta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = (paisId: number, paisNombre: string) => {
    Alert.alert(
      'Eliminar de Mi Ruta',
      `¿Quieres eliminar a ${paisNombre} de tu ruta?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarVisita(paisId);
              setRuta(prev => prev.filter(item => item.paisId !== paisId));
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el destino');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item, index }: { item: RutaItem; index: number }) => (
    <View style={styles.card}>
      <View style={styles.indexBadge}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>

      <Image
        source={{ uri: item.paisBanderaUrl || 'https://via.placeholder.com/150' }}
        style={styles.flag}
        resizeMode="cover"
      />

      <View style={styles.cardInfo}>
        <Text style={styles.countryName}>{item.paisNombre}</Text>
        {item.paisCapital ? (
          <Text style={styles.capitalText}>🏛️ {item.paisCapital}</Text>
        ) : null}
        <Text style={styles.dateText}>
          📅 {new Date(item.fechaVisita).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleEliminar(item.paisId, item.paisNombre)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Ruta</Text>
        <Text style={styles.subtitle}>
          {ruta.length > 0
            ? `${ruta.length} destino${ruta.length > 1 ? 's' : ''} planeado${ruta.length > 1 ? 's' : ''}`
            : 'Tus próximos destinos'}
        </Text>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
        ) : ruta.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🗺️</Text>
            <Text style={styles.emptyTitle}>Ruta vacía</Text>
            <Text style={styles.emptyText}>
              Explora países y agrégalos a tu ruta para planear tu próximo viaje.
            </Text>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={() => router.push('/(tabs)/home')}
            >
              <Text style={styles.exploreButtonText}>Explorar países</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={ruta}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0033A0',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 5,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  loader: {
    marginTop: 50,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
    paddingRight: 15,
  },
  indexBadge: {
    backgroundColor: '#0033A0',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  indexText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 13,
  },
  flag: {
    width: 72,
    height: 72,
    backgroundColor: '#E0E0E0',
    marginLeft: 10,
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  countryName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0033A0',
    marginBottom: 3,
  },
  capitalText: {
    fontSize: 12,
    color: '#444',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
  },
  deleteButton: {
    padding: 10,
    backgroundColor: '#FFF0F0',
    borderRadius: 50,
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 70,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0033A0',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#0033A0',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
