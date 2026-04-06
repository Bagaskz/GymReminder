import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Komponen ScheduleItem untuk menampilkan setiap item jadwal gym
const ScheduleItem = ({ item }) => {
  return (
    // Container utama item
    <View style={styles.container}>

      {/* Gambar workout */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Informasi jadwal */}
      <View style={styles.info}>
        
        {/* Judul workout */}
        <Text style={styles.title}>{item.title}</Text>

        {/* Hari dengan icon */}
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={14} color="#555" />
          <Text style={styles.day}>{item.day}</Text>
        </View>

      </View>
    </View>
  );
};

export default ScheduleItem;

// Style untuk item jadwal
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // gambar dan teks sejajar
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
    elevation: 2 // efek bayangan
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  info: {
    marginLeft: 10
  },
  title: {
    fontWeight: 'bold'
  },
  day: {
    marginLeft: 5,
    color: '#777'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});