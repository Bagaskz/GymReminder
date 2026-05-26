import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WorkoutDetailScreen from './src/screens/WorkoutDetailScreen';

import { initialSchedules, categories } from './src/data/workoutData';

const Stack = createStackNavigator();

const App = () => {
  // State schedules ditaruh langsung di App.js menggunakan data awal dari folder data
  const [schedules, setSchedules] = useState(initialSchedules);

  // Fungsi menghapus jadwal
  const deleteWorkout = (id) => {
    setSchedules(schedules.filter(item => item.id !== id));
  };

  // Fungsi mereset jadwal ke setelan bawaan awal
  const resetSchedules = () => {
    setSchedules(initialSchedules);
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" translucent backgroundColor="transparent" />
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#f8fafc' },
            gestureEnabled: true,
          }}
        >
          {/* Rute 1: Dashboard Utama */}
          <Stack.Screen 
            name="Home" 
            children={(props) => (
              <HomeScreen 
                {...props} 
                schedules={schedules} 
                deleteWorkout={deleteWorkout} 
                categories={categories} 
              />
            )}
          />

          {/* Rute 2: Profil & Statistik (Menggantikan Form AddWorkout) */}
          <Stack.Screen 
            name="Profile" 
            children={(props) => (
              <ProfileScreen 
                {...props} 
                schedules={schedules} 
                resetSchedules={resetSchedules}
              />
            )}
          />

          {/* Rute 3: Detail Latihan & Timer */}
          <Stack.Screen 
            name="WorkoutDetail" 
            children={(props) => (
              <WorkoutDetailScreen 
                {...props} 
                schedules={schedules} 
              />
            )}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;