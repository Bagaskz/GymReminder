import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import WorkoutDetailScreen from './src/screens/WorkoutDetailScreen';

import { initialSchedules, categories } from './src/data/workoutData';

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
      <StatusBar style="dark" translucent backgroundColor="transparent" />

      {/* Rute 1: Dashboard Utama (Aktif secara default) */}
      <HomeScreen 
        schedules={schedules} 
        deleteWorkout={deleteWorkout} 
        categories={categories} 
        onWorkoutPress={() => {}}
      />

      {/* Rute 2: Profil & Statistik (Hapus komentar di bawah untuk mengaktifkan) */}
      {/* 
      <ProfileScreen 
        schedules={schedules} 
        resetSchedules={resetSchedules}
        onBackPress={() => {}}
      /> 
      */}

      {/* Rute 3: Detail Latihan & Timer (Hapus komentar di bawah untuk mengaktifkan) */}
      {/* 
      <WorkoutDetailScreen 
        id="1"
        schedules={schedules} 
        onBackPress={() => {}}
      /> 
      */}

    </SafeAreaProvider>
  );
};

export default App;