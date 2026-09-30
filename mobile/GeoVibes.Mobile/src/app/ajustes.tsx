import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAjustes } from '../context/AjustesContext';

export default function AjustesScreen() {
  const { idioma, cambiarIdioma, t } = useAjustes();

  const handleCambiarIdioma = (nuevoIdioma: string) => {
    cambiarIdioma(nuevoIdioma);
    Alert.alert(
      t('idioma'),
      `${nuevoIdioma === 'es' ? 'Español' : nuevoIdioma === 'en' ? 'English' : 'Português'}`
    );
  };

  const idiomas = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome5 name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('ajustes')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {/* IDIOMA */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="language" size={20} color="#FFD700" />
            <Text style={styles.sectionTitle}>{t('idioma')}</Text>
          </View>
          {idiomas.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[styles.option, idioma === lang.code && styles.optionActive]}
              onPress={() => handleCambiarIdioma(lang.code)}
            >
              <View style={styles.optionLeft}>
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text style={styles.optionText}>{lang.label}</Text>
              </View>
              {idioma === lang.code && (
                <FontAwesome5 name="check-circle" size={20} color="#FFD700" solid />
              )}
            </TouchableOpacity>
          ))}
        </View>



        {/* ACERCA DE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome5 name="info-circle" size={20} color="#FFD700" />
            <Text style={styles.sectionTitle}>{t('acercaDe')}</Text>
          </View>
          <View style={styles.aboutCard}>
            <FontAwesome5 name="globe-americas" size={40} color="#FFD700" style={styles.aboutIcon} />
            <Text style={styles.aboutTitle}>GeoVibes</Text>
            <Text style={styles.aboutVersion}>Versión 1.0.0</Text>
            <Text style={styles.aboutDescription}>
              {t('descripcionApp')}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0033A0' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: { padding: 20 },
  section: { marginBottom: 30 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: { fontSize: 24, marginRight: 10 },
  optionText: { fontSize: 16, color: '#FFFFFF' },
  fontSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fontButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  fontButtonActive: {
    backgroundColor: '#FFD700',
  },
  fontButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
  fontButtonTextActive: { color: '#0033A0' },
  aboutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  aboutIcon: { marginBottom: 10 },
  aboutTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  aboutVersion: { fontSize: 14, color: '#FFD700', marginTop: 5 },
  aboutDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 15,
    opacity: 0.9,
    lineHeight: 20,
  },
  aboutDivider: {
    width: '80%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 15,
  },
  aboutTeam: { fontSize: 16, fontWeight: 'bold', color: '#FFD700', marginBottom: 10 },
  aboutName: { fontSize: 14, color: '#FFFFFF', marginBottom: 5 },
});
