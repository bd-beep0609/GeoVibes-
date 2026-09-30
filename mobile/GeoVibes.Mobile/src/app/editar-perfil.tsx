import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { actualizarPerfil, cambiarPassword } from '../services/perfil';
import { useAjustes } from '../context/AjustesContext';

export default function EditarPerfilScreen() {
  const router = useRouter();
  const { t } = useAjustes();

  // Profile fields
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [paisOrigen, setPaisOrigen] = useState('');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

  // Password fields
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNueva, setShowPasswordNueva] = useState(false);

  // States
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const nombre = await AsyncStorage.getItem('nombreCompleto');
      const email = await AsyncStorage.getItem('correo');
      const pais = await AsyncStorage.getItem('paisOrigen');
      const avatar = await AsyncStorage.getItem('avatarUri');

      if (nombre) setNombreCompleto(nombre);
      if (email) setCorreo(email);
      if (pais) setPaisOrigen(pais);
      if (avatar) setAvatarUri(avatar);
    } catch (error) {
      console.error('Error al cargar datos locales', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setAvatarUri(uri);
      await AsyncStorage.setItem('avatarUri', uri);
    }
  };

  const handleGuardarPerfil = async () => {
    if (!nombreCompleto || !correo || !paisOrigen) {
      Alert.alert('Error', 'Nombre, correo y país son obligatorios.');
      return;
    }

    setLoading(true);
    try {
      await actualizarPerfil({ nombreCompleto, correo, paisOrigen });
      Alert.alert('Éxito', 'Perfil actualizado correctamente.');
      // router.back() to refresh or let the user go back manually
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.mensaje || 'No se pudo actualizar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarPassword = async () => {
    if (!passwordActual || !passwordNueva) {
      Alert.alert('Error', 'Ambas contraseñas son requeridas.');
      return;
    }
    if (passwordNueva.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoadingPassword(true);
    try {
      await cambiarPassword(passwordActual, passwordNueva);
      Alert.alert('Éxito', 'Contraseña cambiada correctamente.');
      setPasswordActual('');
      setPasswordNueva('');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.mensaje || 'No se pudo cambiar la contraseña.');
    } finally {
      setLoadingPassword(false);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#FFD700" style={{ marginTop: 50 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <FontAwesome5 name="arrow-left" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Editar Perfil</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* SECCIÓN AVATAR */}
          <View style={styles.avatarSection}>
            <TouchableOpacity onPress={handlePickImage} style={styles.avatarContainer}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>{nombreCompleto.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <View style={styles.editIconBadge}>
                <FontAwesome5 name="camera" size={12} color="#0033A0" />
              </View>
            </TouchableOpacity>
            <Text style={styles.avatarLabel}>Toca para cambiar foto</Text>
          </View>

          {/* SECCIÓN DATOS PERFIL */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos Personales</Text>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="user" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#666"
                value={nombreCompleto}
                onChangeText={setNombreCompleto}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="envelope" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={correo}
                onChangeText={setCorreo}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="globe-americas" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="País de origen"
                placeholderTextColor="#666"
                value={paisOrigen}
                onChangeText={setPaisOrigen}
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleGuardarPerfil} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#0033A0" />
              ) : (
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* SECCIÓN CAMBIAR CONTRASEÑA */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña actual"
                placeholderTextColor="#666"
                secureTextEntry={!showPasswordActual}
                value={passwordActual}
                onChangeText={setPasswordActual}
              />
              <TouchableOpacity onPress={() => setShowPasswordActual(!showPasswordActual)} style={{ padding: 10 }}>
                <FontAwesome5 name={showPasswordActual ? "eye-slash" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nueva contraseña"
                placeholderTextColor="#666"
                secureTextEntry={!showPasswordNueva}
                value={passwordNueva}
                onChangeText={setPasswordNueva}
              />
              <TouchableOpacity onPress={() => setShowPasswordNueva(!showPasswordNueva)} style={{ padding: 10 }}>
                <FontAwesome5 name={showPasswordNueva ? "eye-slash" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.saveButton, styles.passwordButton]} onPress={handleCambiarPassword} disabled={loadingPassword}>
              {loadingPassword ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.passwordButtonText}>Actualizar Contraseña</Text>
              )}
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0033A0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },
  avatarContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0033A0',
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFD700',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#0033A0',
  },
  avatarLabel: {
    color: '#FFFFFF',
    marginTop: 10,
    opacity: 0.8,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: {
    width: 24,
    textAlign: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333333',
    fontSize: 16,
    height: '100%',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  saveButtonText: {
    color: '#0033A0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  passwordButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  passwordButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
