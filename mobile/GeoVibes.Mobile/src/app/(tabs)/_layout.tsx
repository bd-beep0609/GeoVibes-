import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAjustes } from '../../context/AjustesContext';

export default function TabLayout() {
  const { t } = useAjustes();

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
          title: t('explorar'),
          tabBarIcon: ({ color }) => <FontAwesome5 name="globe-americas" size={20} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="favoritos" 
        options={{ 
          title: t('favoritos'),
          tabBarIcon: ({ color }) => <FontAwesome5 name="heart" size={20} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="mi-ruta" 
        options={{ 
          title: t('miRuta'),
          tabBarIcon: ({ color }) => <FontAwesome5 name="map-marker-alt" size={20} color={color} />,
        }} 
      />
      <Tabs.Screen 
        name="perfil" 
        options={{ 
          title: t('perfil'),
          tabBarIcon: ({ color }) => <FontAwesome5 name="user" size={20} color={color} />,
        }} 
      />
    </Tabs>
  );
}
