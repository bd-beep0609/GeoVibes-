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
import { useFocusEffect } from 'expo-router';
import { getFavoritos, eliminarFavorito, Favorito } from '../../services/favoritos';

export default function FavoritosScreen() {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      cargarFavoritos();
    }, [])
  );

  const cargarFavoritos = async () => {
    setLoading(true);
    try {
      const data = await getFavoritos();
      setFavoritos(data);
    } catch (error) {
      console.error('Error fetching favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = (paisId: number, paisNombre: string) => {
    Alert.alert(
      'Eliminar favorito',
      `¿Estás seguro de eliminar a ${paisNombre} de tus favoritos?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarFavorito(paisId);
              setFavoritos(prev => prev.filter(fav => fav.paisId !== paisId));
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el favorito');
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: Favorito }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.paisBanderaUrl || 'https://via.placeholder.com/150' }} 
        style={styles.flag} 
        resizeMode="cover"
      />
      <View style={styles.cardInfo}>
        <Text style={styles.countryName}>{item.paisNombre}</Text>
        <Text style={styles.dateText}>
          Agregado el {new Date(item.fechaAgregado).toLocaleDateString()}
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
        <Text style={styles.title}>Mis Favoritos</Text>
        <Text style={styles.subtitle}>Tus lugares guardados</Text>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFD700" style={styles.loader} />
        ) : favoritos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🗺️</Text>
            <Text style={styles.emptyText}>Aún no tienes favoritos guardados.</Text>
          </View>
        ) : (
          <FlatList
            data={favoritos}
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
  flag: {
    width: 80,
    height: 80,
    backgroundColor: '#E0E0E0',
  },
  cardInfo: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  countryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0033A0',
    marginBottom: 4,
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
    fontSize: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  }
});
