import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Text, 
  Alert,
  Animated,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import MainCard from '../components/MainCard';
import ScheduleItem from '../components/ScheduleItem';

const HomeScreen = ({ navigation, schedules, isLoading, deleteWorkout, toggleWorkoutCompleted, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Nilai Animasi untuk efek masuk (Entrance)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current; // Geser dari bawah (30px)

  useEffect(() => {
    // Jalankan animasi masuk secara paralel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  // Dapatkan hari ini
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[new Date().getDay()];

  // Cari jadwal latihan hari ini
  const todayWorkout = schedules.find(
    item => item.day.toLowerCase() === todayName.toLowerCase()
  );

  // Filter jadwal berdasarkan kategori yang dipilih
  const filteredSchedules = selectedCategory
    ? schedules.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase())
    : schedules;

  const handleHapusJadwal = (id) => {
    Alert.alert(
      "Hapus Jadwal",
      "Apakah Anda yakin ingin menghapus jadwal latihan ini?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Hapus", 
          style: "destructive",
          onPress: () => {
            deleteWorkout(id);
            Alert.alert("Sukses", "Jadwal berhasil dihapus!");
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Utama */}
      <Header />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Memuat jadwal latihan...</Text>
        </View>
      ) : (
        /* Kontainer beranimasi pembungkus isi dashboard */
        <Animated.View style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* FlatList Utama yang Merender Header & Item List */}
          <FlatList
            data={filteredSchedules}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={
              <>
                <View style={styles.greetingContainer}>
                  <Text style={styles.greetingText}>Halo, Calon Atlet! 👋</Text>
                  <Text style={styles.subGreetingText}>Ayo pertahankan konsistensi latihanmu.</Text>
                </View>

                <Text style={styles.sectionTitle}>Latihan Hari Ini</Text>
                <MainCard 
                  workout={todayWorkout} 
                  onPress={() => todayWorkout && navigation.navigate('WorkoutDetail', { id: todayWorkout.id })}
                />

                <Text style={styles.sectionTitle}>Kategori Latihan</Text>
                <CategoryList 
                  categories={categories} 
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />

                <Text style={styles.sectionTitle}>
                  {selectedCategory ? `Jadwal ${selectedCategory}` : 'Semua Jadwal Latihan'}
                </Text>
                
                {filteredSchedules.length === 0 ? (
                  <View style={styles.emptyContainer}>
                    <Ionicons name="barbell-outline" size={48} color="#cbd5e1" />
                    <Text style={styles.emptyText}>Tidak ada jadwal untuk kategori ini.</Text>
                  </View>
                ) : null}
              </>
            }
            renderItem={({ item }) => (
              <ScheduleItem 
                item={item} 
                onDelete={handleHapusJadwal}
                onPress={() => navigation.navigate('WorkoutDetail', { id: item.id })}
                onToggleComplete={toggleWorkoutCompleted}
              />
            )}
          />
        </Animated.View>
      )}

      {/* Tombol Tambah Jadwal Melayang (Floating Action Button) */}
      <TouchableOpacity 
        style={styles.fab} 
        onPress={() => navigation.navigate('AddScheduleForm')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 15,
    fontWeight: '600',
  },
  greetingContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  subGreetingText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginTop: 15,
    marginBottom: 8,
  },
  emptyContainer: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed'
  },
  emptyText: {
    marginTop: 8,
    color: '#94a3b8',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  }
});
