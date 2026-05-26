import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Text, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from './src/components/Header';
import CategoryList from './src/components/CategoryList';
import MainCard from './src/components/MainCard';
import ScheduleItem from './src/components/ScheduleItem';

const App = () => {

  // ===== STATE =====
  const [schedules, setSchedules] = useState([
    { 
      id: '1', 
      title: 'Leg Day', 
      day: 'Monday', 
      image: 'https://tse4.mm.bing.net/th/id/OIP.kHRTsoaOdP87Ksj21XLH5gHaE8?pid=Api&h=220&P=0' 
    },
    { 
      id: '2', 
      title: 'Cardio', 
      day: 'Tuesday', 
      image: 'https://cdn.mos.cms.futurecdn.net/5QV4TcUWvsfYmm9hAdWXHD.jpg' 
    },
    { 
      id: '3', 
      title: 'Back Day', 
      day: 'Friday', 
      image: 'https://gymgeek.com/wp-content/uploads/2024/01/back-day-workout-1024x576.jpeg' 
    }
  ]);

  // Data kategori (tidak perlu state)
  const categories = [
    { name: 'Strength', icon: 'barbell' },
    { name: 'Cardio', icon: 'run' },
    { name: 'Yoga', icon: 'meditation' }
  ];

  // ===== FUNGSI STATE =====
  const tambahJadwal = () => {
    const newJadwal = {
      id: Date.now().toString(),
      title: 'New Workout',
      day: 'Saturday',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b'
    };

    setSchedules([...schedules, newJadwal]);
    Alert.alert('Sukses', 'Jadwal baru berhasil ditambahkan!');
  };

  const hapusJadwal = (id) => {
    Alert.alert(
      "Hapus Jadwal",
      "Yakin ingin menghapus jadwal ini?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Hapus", 
          style: "destructive",
          onPress: () => {
            setSchedules(schedules.filter(item => item.id !== id));
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>

      <Header />
      <CategoryList categories={categories} />
      <MainCard />

      {/* Tombol Tambah Jadwal */}
      <TouchableOpacity style={styles.button} onPress={tambahJadwal}>
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.buttonText}>Tambah Jadwal</Text>
      </TouchableOpacity>

      {/* FlatList dengan props onDelete */}
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ScheduleItem 
            item={item} 
            onDelete={hapusJadwal}     // Kirim fungsi hapus via props
          />
        )}
      />

    </View>
  );
};

export default App;

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f2f5'
  },

  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },

  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold'
  }
});