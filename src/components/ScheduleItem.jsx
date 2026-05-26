import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ScheduleItem = ({ item, onDelete, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      
      {/* Gambar */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Informasi */}
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={14} color="#555" />
          <Text style={styles.day}>{item.day}</Text>
          <Text style={styles.dot}>•</Text>
          <Ionicons name="time-outline" size={14} color="#555" />
          <Text style={styles.duration}>{item.duration} Min</Text>
        </View>
      </View>

      {/* Tombol Hapus */}
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation(); // Mencegah event onPress card terpicu
          onDelete(item.id);
        }}
      >
        <Ionicons name="trash-outline" size={22} color="#ff4757" />
      </TouchableOpacity>

    </TouchableOpacity>
  );
};

export default ScheduleItem;

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 18,
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    alignItems: 'center',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 14,
  },
  info: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#1e293b'
  },
  day: {
    marginLeft: 4,
    color: '#64748b',
    fontSize: 13,
  },
  duration: {
    marginLeft: 4,
    color: '#64748b',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    color: '#94a3b8',
    marginHorizontal: 6,
    fontSize: 12
  },
  deleteButton: {
    padding: 8,
  },
});