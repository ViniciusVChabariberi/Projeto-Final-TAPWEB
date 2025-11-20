import React from 'react';
import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0EA5E9',
        tabBarInactiveTintColor: '#94A3B8',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: 'rgba(148, 163, 184, 0.2)',
          paddingTop: 5,
          paddingBottom: Platform.OS === 'ios' ? 36 : 28,
          height: Platform.OS === 'ios' ? 110 : 100,
          elevation: 8,
          shadowColor: '#0F172A',
          shadowOpacity: 0.1,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -4 },
          ...Platform.select({
            ios: { position: 'absolute' },
            default: {},
          }),
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.3,
          marginTop: 2,
          marginBottom: 8,
        },
        tabBarIconStyle: {
          marginTop: 0,
        },
        animation: 'shift',
      }}
    >
      {/* Palpites */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Palpites',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 30 : 28} 
              name="palpites" 
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />

      
      <Tabs.Screen
        name="ranking"
        options={{
          title: 'Ranking',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={focused ? 30 : 28} 
              name="trophy.fill" 
              color={color}
              style={{
                transform: [{ scale: focused ? 1.1 : 1 }],
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}