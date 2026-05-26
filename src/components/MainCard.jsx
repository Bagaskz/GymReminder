import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Komponen MainCard untuk menampilkan workout utama hari ini (dinamis)
const MainCard = ({ workout, onPress }) => {
  if (!workout) {
    // Tampilan jika hari ini adalah Rest Day (tidak ada jadwal)
    return (
      <View style={[styles.card, styles.restCard]}>
        <View style={styles.restHeader}>
          <Ionicons name="sparkles" size={24} color="#FFD700" />
          <Text style={styles.restTitle}>Rest Day</Text>
        </View>
        <Text style={styles.restSubtitle}>
          Hari ini tidak ada jadwal latihan. Gunakan waktu untuk istirahat dan pemulihan otot!
        </Text>
      </View>
    );
  }

  return (
    // Card utama yang dapat diklik
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>

      {/* Gambar workout */}
      <Image
        source={{ uri: workout.image }}
        style={styles.image}
      />

      {/* Overlay Gradasi gelap di bagian bawah gambar untuk keterbacaan teks */}
      <View style={styles.infoOverlay}>
        
        {/* Label Hari ini / Today */}
        <View style={styles.todayBadge}>
          <Text style={styles.todayText}>TODAY</Text>
        </View>

        {/* Baris hari + icon */}
        <View style={styles.row}>
          <Ionicons name="calendar" size={16} color="#fff" />
          <Text style={styles.day}>{workout.day}</Text>
          <Text style={styles.dot}>•</Text>
          <Ionicons name="time-outline" size={16} color="#fff" />
          <Text style={styles.duration}>{workout.duration} Min</Text>
        </View>

        {/* Judul workout */}
        <Text style={styles.title}>{workout.title}</Text>
        
        {/* Kategori Latihan */}
        <Text style={styles.category}>{workout.category}</Text>

      </View>
      
      {/* Indicator klik detail */}
      <View style={styles.detailArrow}>
        <Ionicons name="chevron-forward-circle" size={32} color="#4CAF50" />
      </View>
    </TouchableOpacity>
  );
};

export default MainCard;

// Style untuk tampilan card utama
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    position: 'relative'
  },
  restCard: {
    padding: 24,
    backgroundColor: '#1e293b', // warna gelap premium
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155'
  },
  restHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  restTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 8
  },
  restSubtitle: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20
  },
  image: {
    width: '100%',
    height: 180
  },
  infoOverlay: {
    padding: 16,
    backgroundColor: '#2d3748' // background gelap untuk info teks
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4
  },
  category: {
    fontSize: 12,
    color: '#a0aec0',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 2
  },
  day: {
    marginLeft: 5,
    color: '#e2e8f0',
    fontWeight: '500'
  },
  duration: {
    marginLeft: 5,
    color: '#e2e8f0',
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    color: '#a0aec0',
    marginHorizontal: 8,
    fontSize: 14
  },
  todayBadge: {
    position: 'absolute',
    top: -155,
    left: 16,
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  todayText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold'
  },
  detailArrow: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
});