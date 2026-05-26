import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScheduleItem = ({ item, onDelete }) => {
  return (
    <View style={styles.container}>
      
      {/* Gambar */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Informasi */}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={14} color="#555" />
          <Text style={styles.day}>{item.day}</Text>
        </View>
      </View>

      {/* Tombol Hapus */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <Ionicons name="trash-outline" size={24} color="#ff4757" />
      </TouchableOpacity>

    </View>
  );
};

export default ScheduleItem;

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 15,
    marginTop: 10,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  day: {
    marginLeft: 5,
    color: '#777',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
  },
});