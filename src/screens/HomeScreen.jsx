import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  FlatList, 
  Text, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import MainCard from '../components/MainCard';
import ScheduleItem from '../components/ScheduleItem';

const HomeScreen = ({ navigation, schedules, deleteWorkout, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          />
        )}
      />
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
  }
});
