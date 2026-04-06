import React from 'react';

// Import komponen dasar dari React Native
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';

// Import icon dari Expo
import { Ionicons } from '@expo/vector-icons';

// Import komponen custom (yang kamu buat sendiri di folder src/components)
import Header from './src/components/Header'; // Komponen header (judul aplikasi)
import CategoryList from './src/components/CategoryList'; // Komponen list kategori workout
import MainCard from './src/components/MainCard'; // Komponen card utama (workout hari ini)
import ScheduleItem from './src/components/ScheduleItem'; // Komponen item untuk setiap jadwal

const App = () => {

  // ===== DATA KATEGORI =====
  // Digunakan untuk menampilkan jenis workout (strength, cardio, dll)
  const categories = [
    { name: 'Strength', icon: 'barbell' },
    { name: 'Cardio', icon: 'run' },
    { name: 'Yoga', icon: 'meditation' }
  ];

  // ===== DATA JADWAL =====
  // Berisi daftar jadwal gym yang akan ditampilkan pada FlatList
  const schedules = [
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
  ];

  return (
    // ===== CONTAINER UTAMA =====
    // View utama yang membungkus seluruh tampilan aplikasi
    <View style={styles.container}>

      {/* ===== HEADER ===== */}
      {/* Menampilkan judul aplikasi Gym Reminder */}
      <Header />

      {/* ===== KATEGORI ===== */}
      {/* Menampilkan kategori workout dalam bentuk horizontal */}
      <CategoryList categories={categories} />

      {/* ===== CARD UTAMA ===== */}
      {/* Menampilkan workout utama hari ini */}
      <MainCard />

      {/* ===== TOMBOL TAMBAH ===== */}
      {/* Tombol untuk menambahkan jadwal baru */}
      <TouchableOpacity style={styles.button}>
        
        {/* Icon tambah */}
        <Ionicons name="add" size={20} color="#fff" />

        {/* Text tombol */}
        <Text style={styles.buttonText}>Tambah Jadwal</Text>
      </TouchableOpacity>

      {/* ===== FLATLIST ===== */}
      {/* Menampilkan daftar jadwal gym secara dinamis */}
      <FlatList
        data={schedules} // sumber data
        keyExtractor={(item) => item.id} // key unik untuk setiap item
        
        // renderItem akan memanggil komponen ScheduleItem untuk setiap data
        renderItem={({ item }) => <ScheduleItem item={item} />}
      />

    </View>
  );
};

export default App;

// ===== STYLE =====
const styles = StyleSheet.create({

  // Container utama aplikasi
  container: {
    flex: 1, // memenuhi seluruh layar
    padding: 16, // jarak dalam
    backgroundColor: '#f0f2f5' // warna background
  },

  // Style tombol tambah
  button: {
    flexDirection: 'row', // icon dan text sejajar horizontal
    backgroundColor: '#4CAF50', // warna hijau
    padding: 12,
    borderRadius: 12, // sudut melengkung
    justifyContent: 'center', // posisi tengah horizontal
    alignItems: 'center', // posisi tengah vertikal
    marginTop: 10
  },

  // Style text pada tombol
  buttonText: {
    color: '#fff', // warna putih
    marginLeft: 5, // jarak dari icon
    fontWeight: 'bold'
  }

});