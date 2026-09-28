import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getDetallePais } from '../../services/paises';
import { Pais } from '../../types/Pais';
import { agregarFavorito, eliminarFavorito, getFavoritos } from '../../services/favoritos';
import { agregarVisita, getRuta } from '../../services/ruta';

export default function DetalleScreen() {
  const { id } = useLocalSearchParams();
  const [pais, setPais] = useState<Pais | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInRuta, setIsInRuta] = useState(false);
  const [rutaLoading, setRutaLoading] = useState(false);

  useEffect(() => {
    cargarDetalle();
  }, [id]);

  const cargarDetalle = async () => {
    try {
      const data = await getDetallePais(Number(id));
      setPais(data);

      const favoritos = await getFavoritos();
      const fav = favoritos.find(f => f.paisId === Number(id));
      setIsFavorite(!!fav);

      const ruta = await getRuta();
      const enRuta = ruta.find(v => v.paisId === Number(id));
      setIsInRuta(!!enRuta);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el detalle');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorito = async () => {
    try {
      if (isFavorite) {
        await eliminarFavorito(Number(id));
        setIsFavorite(false);
      } else {
        await agregarFavorito(Number(id));
        setIsFavorite(true);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar favoritos');
    }
  };

  const handleAgregarRuta = async () => {
    if (isInRuta) {
      Alert.alert('Ya en tu ruta', `${pais?.nombre} ya está en tu Mi Ruta.`);
      return;
    }
    setRutaLoading(true);
    try {
      await agregarVisita(Number(id));
      setIsInRuta(true);
      Alert.alert('¡Agregado!', `${pais?.nombre} fue añadido a Mi Ruta. 🗺️`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar a Mi Ruta');
    } finally {
      setRutaLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: '#0033A0' }]}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  if (!pais) return null;

  const gradientColors: [string, string, string] = [
    pais.colorPrimario || '#0033A0',
    '#FFFFFF',
    pais.colorSecundario || pais.colorPrimario || '#001A52',
  ];

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorito}>
          <Text style={styles.favoriteText}>{isFavorite ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          {pais.aveImagenUrl ? (
            <Image source={{ uri: pais.aveImagenUrl }} style={styles.aveImage} resizeMode="cover" />
          ) : (
            <Text style={styles.emoji}>🐦</Text>
          )}
          <Text style={styles.title}>{pais.nombre}</Text>
          <Text style={styles.subtitle}>{pais.descripcionBreve}</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardIcon}>🏛️</Text>
            <Text style={styles.cardLabel}>Capital</Text>
            <Text style={styles.cardValue}>{pais.capital}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardIcon}>💰</Text>
            <Text style={styles.cardLabel}>Moneda</Text>
            <Text style={styles.cardValue}>{pais.moneda}</Text>
          </View>

          <View style={styles.card}>
            {pais.aveImagenUrl ? (
              <Image source={{ uri: pais.aveImagenUrl }} style={styles.cardAveImage} resizeMode="contain" />
            ) : (
              <Text style={styles.cardIcon}>🐦</Text>
            )}
            <Text style={styles.cardLabel}>Ave</Text>
            <Text style={styles.cardValue}>{pais.aveNacional}</Text>
          </View>
        </View>

        <View style={styles.culturaSection}>
          <Text style={styles.culturaTitle}>Cultura</Text>
          <View style={styles.culturaCard}>
            <Text style={styles.culturaItem}>🍽️ {pais.cultura?.gastronomia}</Text>
            <Text style={styles.culturaItem}>🎵 {pais.cultura?.musica}</Text>
            <Text style={styles.culturaItem}>🏛️ {pais.cultura?.patrimonio}</Text>
            <Text style={styles.culturaItem}>💡 {pais.cultura?.datoCurioso}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.explorarButton}>
          <Text style={styles.explorarText}>¡Explorar {pais.nombre}! 🗺️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.rutaButton, isInRuta && styles.rutaButtonVisited]}
          onPress={handleAgregarRuta}
          disabled={rutaLoading}
        >
          <Text style={styles.rutaText}>
            {rutaLoading ? '...' : isInRuta ? '✅ En Mi Ruta' : '📍 Agregar a Mi Ruta'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  backText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  favoriteButton: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  favoriteText: { fontSize: 24 },
  header: { alignItems: 'center', marginBottom: 30 },
  emoji: { fontSize: 80, marginBottom: 10 },
  aveImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  cardAveImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 5,
  },
  title: { fontSize: 40, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#FFFFFF', textAlign: 'center', marginTop: 10 },
  cardsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10, width: '31%', alignItems: 'center' },
  cardIcon: { fontSize: 24, marginBottom: 5 },
  cardLabel: { fontSize: 12, color: '#666' },
  cardValue: { fontSize: 14, fontWeight: 'bold', color: '#0033A0', textAlign: 'center' },
  culturaSection: { marginTop: 20 },
  culturaTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  culturaCard: { backgroundColor: '#FFFFFF', padding: 15, borderRadius: 10 },
  culturaItem: { fontSize: 14, color: '#333', marginBottom: 8 },
  explorarButton: { backgroundColor: '#FFD700', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  explorarText: { color: '#0033A0', fontSize: 18, fontWeight: 'bold' },
  rutaButton: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 12, marginBottom: 30, borderWidth: 2, borderColor: '#FFFFFF' },
  rutaButtonVisited: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  rutaText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
