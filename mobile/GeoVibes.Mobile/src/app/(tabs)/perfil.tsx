import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../services/auth';
import { useAjustes } from '../../context/AjustesContext';

export default function PerfilScreen() {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [rol, setRol] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const { t } = useAjustes();

  useFocusEffect(
    useCallback(() => {
      cargarDatos();
    }, [])
  );

  const cargarDatos = async () => {
    const nombre = await AsyncStorage.getItem('nombreCompleto');
    const email = await AsyncStorage.getItem('correo');
    const role = await AsyncStorage.getItem('rol');
    const avatar = await AsyncStorage.getItem('avatarUri');

    setNombreCompleto(nombre || 'Usuario');
    setCorreo(email || 'correo@geovibes.com');
    setRol(role || 'Usuario');
    setAvatarUri(avatar);
  };

  const handleLogout = () => {
    Alert.alert(
      t('cerrarSesion'),
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: t('cerrarSesion'),
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('miPerfil')}</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Text style={styles.avatarText}>
              {nombreCompleto.charAt(0).toUpperCase()}
            </Text>
          )}
        </View>

        <Text style={styles.name}>{nombreCompleto}</Text>
        <Text style={styles.email}>{correo}</Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>
            {rol === 'Admin' ? <><FontAwesome5 name="crown" size={12} color="#0033A0" /> {t('administrador')}</> : <><FontAwesome5 name="suitcase" size={12} color="#0033A0" /> {t('viajero')}</>}
          </Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => router.push('/editar-perfil')}>
          <FontAwesome5 name="user-edit" size={24} color="#FFFFFF" style={styles.optionIcon} />
          <Text style={styles.optionText}>Editar Perfil</Text>
        </TouchableOpacity>
        {rol === 'Admin' && (
          <TouchableOpacity style={styles.option}>
            <FontAwesome5 name="cog" size={24} color="#FFFFFF" style={styles.optionIcon} />
            <Text style={styles.optionText}>{t('panelAdmin')}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.option} onPress={() => router.push('/ajustes')}>
          <FontAwesome5 name="cog" size={24} color="#FFFFFF" style={styles.optionIcon} />
          <Text style={styles.optionText}>{t('ajustes')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}><FontAwesome5 name="sign-out-alt" size={18} color="#FFFFFF" /> {t('cerrarSesion')}</Text>
      </TouchableOpacity>
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
  },
  profileCard: {
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    marginBottom: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0033A0',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 15,
  },
  roleBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  roleText: {
    color: '#0033A0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#CE1126',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
