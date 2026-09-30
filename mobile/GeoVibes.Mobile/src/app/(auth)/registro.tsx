import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { registro } from '../../services/auth';

export default function RegisterScreen() {
  const router = useRouter();
  
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [correo, setCorreo] = useState('');
  const [paisOrigen, setPaisOrigen] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    if (!nombreCompleto || !correo || !paisOrigen || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    try {
      await registro(nombreCompleto, correo, paisOrigen, password);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al registrar usuario. Verifica si el correo ya existe.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.titleWelcome}>Regístrate</Text>
            <Text style={styles.subtitle}>Únete a la comunidad viajera</Text>
          </View>

          <View style={styles.formContainer}>
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

            <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ padding: 10 }}>
                <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome5 name="lock" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="#666"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ padding: 10 }}>
                <FontAwesome5 name={showConfirmPassword ? "eye-slash" : "eye"} size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Registrando...' : 'Registrar Cuenta'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.registerLinkContainer} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.registerText}>¿Ya tienes cuenta? </Text>
            <Text style={styles.registerLink}>Inicia Sesión</Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleWelcome: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
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
    fontSize: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#333333',
    fontSize: 16,
    height: '100%',
  },
  loginButton: {
    backgroundColor: '#FFD700',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  loginButtonText: {
    color: '#0033A0',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  registerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  registerLink: {
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  }
});
