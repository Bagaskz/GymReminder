import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { initialSchedules, categories } from './src/data/workoutData';
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from './src/services/api';

const App = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ambil data jadwal dari server API saat pertama kali dimuat
  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      let data = await getSchedules();
      
      // Seeding: jika MockAPI baru & kosong, isi otomatis dengan initialSchedules untuk demo awal
      if (data.length === 0) {
        for (const item of initialSchedules) {
          await createSchedule({
            title: item.title,
            day: item.day,
            category: item.category,
            duration: item.duration,
            notes: item.notes,
            image: item.image,
            completed: false
          });
        }
        data = await getSchedules(); // Ambil ulang data yang telah di-seed
      }
      
      setSchedules(data);
    } catch (error) {
      Alert.alert('Koneksi Error', 'Gagal memuat jadwal latihan dari server API.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // POST: Fungsi menambah jadwal baru
  const addWorkout = async (newWorkout) => {
    setIsLoading(true);
    try {
      const savedWorkout = await createSchedule(newWorkout);
      setSchedules(prev => [...prev, savedWorkout]);
      return true;
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan jadwal latihan.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE: Fungsi menghapus jadwal
  const deleteWorkout = async (id) => {
    try {
      await deleteSchedule(id);
      setSchedules(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Gagal menghapus jadwal latihan.');
    }
  };

  // PUT: Fungsi toggle penyelesaian status latihan
  const toggleWorkoutCompleted = async (id) => {
    const itemToToggle = schedules.find(item => item.id === id);
    if (!itemToToggle) return;

    try {
      const updatedItem = await updateSchedule(id, {
        completed: !itemToToggle.completed
      });
      setSchedules(prev => prev.map(item => item.id === id ? updatedItem : item));
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui status latihan.');
    }
  };

  // PUT: Fungsi mengedit/memperbarui jadwal
  const editWorkout = async (id, updatedWorkout) => {
    setIsLoading(true);
    try {
      const savedWorkout = await updateSchedule(id, updatedWorkout);
      setSchedules(prev => prev.map(item => item.id === id ? savedWorkout : item));
      return true;
    } catch (error) {
      Alert.alert('Error', 'Gagal memperbarui jadwal latihan.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // PUT + DELETE + POST: Mereset server API ke setelan bawaan awal
  const resetSchedules = async () => {
    setIsLoading(true);
    try {
      // Hapus semua data di server
      for (const item of schedules) {
        await deleteSchedule(item.id);
      }
      
      // Kirim ulang data default
      for (const item of initialSchedules) {
        await createSchedule({
          title: item.title,
          day: item.day,
          category: item.category,
          duration: item.duration,
          notes: item.notes,
          image: item.image,
          completed: false
        });
      }
      
      const data = await getSchedules();
      setSchedules(data);
      Alert.alert('Sukses', 'Jadwal latihan telah di-reset ke setelan awal.');
    } catch (error) {
      Alert.alert('Error', 'Gagal mereset jadwal latihan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaProvider>
      <AppNavigator 
        schedules={schedules} 
        isLoading={isLoading}
        deleteWorkout={deleteWorkout} 
        addWorkout={addWorkout}
        editWorkout={editWorkout}
        toggleWorkoutCompleted={toggleWorkoutCompleted}
        categories={categories} 
        resetSchedules={resetSchedules}
      />
    </SafeAreaProvider>
  );
};

export default App;