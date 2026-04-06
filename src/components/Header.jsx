import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Komponen Header untuk menampilkan judul aplikasi
const Header = () => {
  return (
    // Container header (icon + teks)
    <View style={styles.container}>
      
      {/* Icon fitness sebagai identitas aplikasi */}
      <Ionicons name="fitness" size={28} color="#4CAF50" />

      {/* Judul aplikasi */}
      <Text style={styles.title}>Gym Reminder</Text>
    </View>
  );
};

export default Header;

// Style untuk tampilan header
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // icon dan teks sejajar horizontal
    alignItems: 'center',
    marginBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8 // jarak dari icon
  }
});