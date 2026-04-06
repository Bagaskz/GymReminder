import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Komponen MainCard untuk menampilkan workout utama hari ini
const MainCard = () => {
  return (
    // Card utama
    <View style={styles.card}>

      {/* Gambar workout */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e' }}
        style={styles.image}
      />

      {/* Informasi workout */}
      <View style={styles.info}>

        {/* Baris hari + icon */}
        <View style={styles.row}>
          <Ionicons name="calendar" size={16} color="#555" />
          <Text style={styles.day}>Monday</Text>
        </View>

        {/* Judul workout */}
        <Text style={styles.title}>Chest Day</Text>

      </View>
    </View>
  );
};

export default MainCard;

// Style untuk tampilan card utama
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden', // agar gambar mengikuti bentuk card
    marginTop: 15,
    elevation: 4 // efek bayangan
  },
  image: {
    width: '100%',
    height: 160
  },
  info: {
    padding: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  day: {
    marginLeft: 5,
    color: '#777'
  },
  row: {
    flexDirection: 'row', // icon dan teks sejajar
    alignItems: 'center',
    marginBottom: 5
  }
});