import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
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
      <AppNavigator 
        schedules={schedules} 
        deleteWorkout={deleteWorkout} 
        categories={categories} 
        resetSchedules={resetSchedules}
      />
    </SafeAreaProvider>
  );
};

export default App;