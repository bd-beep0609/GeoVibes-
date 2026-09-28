import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#0033A0',
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        }
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Explorar',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🌍</Text>,
        }} 
      />
      <Tabs.Screen 
        name="favoritos" 
        options={{ 
          title: 'Favoritos',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>❤️</Text>,
        }} 
      />
      <Tabs.Screen 
        name="mi-ruta" 
        options={{ 
          title: 'Mi Ruta',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>📍</Text>,
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>👤</Text>,
        }} 
      />
    </Tabs>
  );
}
