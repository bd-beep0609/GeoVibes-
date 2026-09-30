import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { getDetallePais } from '../../services/paises';
import { Pais } from '../../types/Pais';
import { agregarFavorito, eliminarFavorito, getFavoritos } from '../../services/favoritos';
import { agregarVisita, getRuta } from '../../services/ruta';
import { useAjustes } from '../../context/AjustesContext';
import { traducir } from '../../constants/traduccionesContenido';

export default function DetalleScreen() {
  const { id } = useLocalSearchParams();
  const { t, idioma } = useAjustes();
  const [pais, setPais] = useState<Pais | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInRuta, setIsInRuta] = useState(false);
  const [rutaLoading, setRutaLoading] = useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    cargarDetalle();
  }, [id, idioma]);

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
      Alert.alert('¡Agregado!', `${pais?.nombre} fue añadido a Mi Ruta.`);
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar a Mi Ruta');
    } finally {
      setRutaLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: '#0033A0' }]}>
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFD700" />
        </SafeAreaView>
      </View>
    );
  }

  if (!pais) return null;

  const gradientColors: [string, string, string] = [
    pais.colorPrimario || '#0033A0',
    '#FFFFFF',
    pais.colorSecundario || pais.colorPrimario || '#001A52',
  ];

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [1.5, 1, 1],
    extrapolate: 'clamp',
  });

  const imageTranslateY = scrollY.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: [-50, 0, 50],
    extrapolate: 'clamp',
  });

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>{t('volver')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorito}>
          <FontAwesome5 name="heart" size={24} color={isFavorite ? "#FF3B30" : "#FFFFFF"} solid={isFavorite} />
        </TouchableOpacity>

        <View style={styles.header}>
          {pais.aveImagenUrl ? (
            <Animated.Image
              source={{ uri: pais.aveImagenUrl }}
              style={[
                styles.aveImage,
                { transform: [{ scale: imageScale }, { translateY: imageTranslateY }] }
              ]}
              resizeMode="contain"
            />
          ) : (
            <FontAwesome5 name="dove" size={80} color="#FFFFFF" style={styles.emoji} />
          )}
          <Text style={styles.title}>{traducir(pais.nombre, idioma)}</Text>
          <Text style={styles.subtitle}>{traducir(pais.descripcionBreve, idioma)}</Text>
        </View>

        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <FontAwesome5 name="landmark" size={24} color="#0033A0" style={styles.cardIcon} />
            <Text style={styles.cardLabel}>{t('capital')}</Text>
            <Text style={styles.cardValue}>{traducir(pais.capital, idioma)}</Text>
          </View>

          <View style={styles.card}>
            <FontAwesome5 name="coins" size={24} color="#0033A0" style={styles.cardIcon} />
            <Text style={styles.cardLabel}>{t('moneda')}</Text>
            <Text style={styles.cardValue}>{pais.moneda}</Text>
          </View>

          <View style={styles.card}>
            {pais.aveImagenUrl ? (
              <Image source={{ uri: pais.aveImagenUrl }} style={styles.cardAveImage} resizeMode="contain" />
            ) : (
              <FontAwesome5 name="dove" size={24} color="#0033A0" style={styles.cardIcon} />
            )}
            <Text style={styles.cardLabel}>{t('ave')}</Text>
            <Text style={styles.cardValue}>{traducir(pais.aveNacional, idioma)}</Text>
          </View>
        </View>

        <View style={styles.culturaSection}>
          <Text style={styles.culturaTitle}>{t('cultura')}</Text>
          <View style={styles.culturaCard}>
            <Text style={styles.culturaItem}><FontAwesome5 name="utensils" size={14} color="#333" /> {traducir(pais.cultura?.gastronomia, idioma)}</Text>
            <Text style={styles.culturaItem}><FontAwesome5 name="music" size={14} color="#333" /> {traducir(pais.cultura?.musica, idioma)}</Text>
            <Text style={styles.culturaItem}><FontAwesome5 name="landmark" size={14} color="#333" /> {traducir(pais.cultura?.patrimonio, idioma)}</Text>
            <Text style={styles.culturaItem}><FontAwesome5 name="lightbulb" size={14} color="#333" solid /> {traducir(pais.cultura?.datoCurioso, idioma)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.explorarButton}
          onPress={() => router.push({
            pathname: `/lugares/${pais.id}` as any,
            params: {
              paisNombre: pais.nombre,
              colorPrimario: pais.colorPrimario || '#0033A0',
              colorSecundario: pais.colorSecundario || '#001A52',
            },
          })}
        >
          <Text style={styles.explorarText}>{t('explorarPais')} {traducir(pais.nombre, idioma)}! <FontAwesome5 name="map-marked-alt" size={18} color="#0033A0" /></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.rutaButton, isInRuta && styles.rutaButtonVisited]}
          onPress={handleAgregarRuta}
          disabled={rutaLoading}
        >
          <Text style={styles.rutaText}>
            {rutaLoading ? '...' : isInRuta ? <><FontAwesome5 name="check-circle" size={16} color="#FFFFFF" solid /> {t('enRuta')}</> : <><FontAwesome5 name="map-marker-alt" size={16} color="#0033A0" /> {t('agregarRuta')}</>}
          </Text>
        </TouchableOpacity>
      </Animated.ScrollView>
      </SafeAreaView>
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
    width: '100%',
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
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
  rutaButton: {
    backgroundColor: '#FFD700',  // ✅ Amarillo
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  rutaButtonVisited: { backgroundColor: '#4CAF50', borderColor: '#4CAF50' },
  rutaText: { color: '#0033A0', fontSize: 16, fontWeight: 'bold' },  // ✅ Texto azul
});