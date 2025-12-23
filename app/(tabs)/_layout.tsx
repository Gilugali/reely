import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        // headerTitle: () => (
        //   <Image
        //     source={require('../../assets/images/icon-192.png')}
        //     style={{ width: 140, height: 35 }}
        //     resizeMode="contain"
        //   />
        // ),
        headerShadowVisible: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93'
      }}>
      <Tabs.Screen
        name="download"
        options={{
          title: 'Download',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="download-outline" size={size} color={color} />
          ),
          // headerTitle: 'Download Video',
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Archive',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="library" size={size} color={color} />
          ),
          // headerTitle: 'My Archive',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          // headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}

