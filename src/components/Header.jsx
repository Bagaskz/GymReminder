import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Komponen Header premium yang rapi tanpa tombol profil untuk BAB4
const Header = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.leftContainer}>
        {/* Kontainer ikon dengan latar belakang hijau muda lembut */}
        <View style={styles.logoBg}>
          <Ionicons name="fitness" size={20} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Gym Reminder</Text>
      </View>

    </View>
  );
};

export default Header;

// Style premium untuk Header
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginLeft: 10,
    letterSpacing: -0.5,
  }
});