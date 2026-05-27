import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const AddScheduleFormScreen = ({ navigation }) => {
  // State untuk isian formulir
  const [title, setTitle] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('Strength');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');

  // Daftar Hari (Map Singkatan & Nama Lengkap)
  const days = [
    { key: 'Monday', label: 'Mon' },
    { key: 'Tuesday', label: 'Tue' },
    { key: 'Wednesday', label: 'Wed' },
    { key: 'Thursday', label: 'Thu' },
    { key: 'Friday', label: 'Fri' },
    { key: 'Saturday', label: 'Sat' },
    { key: 'Sunday', label: 'Sun' }
  ];

  // Kategori latihan bawaan dengan ikon
  const categories = [
    { name: 'Strength', icon: 'barbell-outline' },
    { name: 'Cardio', icon: 'fitness-outline' },
    { name: 'Yoga', icon: 'body-outline' }
  ];

  // Callback Simpan Jadwal (Hanya UI & Navigasi kembali sesuai permintaan)
  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Form Belum Lengkap', 'Silakan masukkan nama latihan terlebih dahulu.');
      return;
    }
    
    Alert.alert(
      'Simpan Jadwal',
      'Jadwal latihan baru berhasil dibuat! (Simulasi penyimpanan)',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Formulir */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tambah Jadwal</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          
          {/* Bagian 1: Nama Latihan */}
          <Text style={styles.inputLabel}>Nama Latihan</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="pencil-outline" size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Chest Day, Yoga Pagi"
              placeholderTextColor="#94a3b8"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Bagian 2: Hari Latihan */}
          <Text style={styles.inputLabel}>Hari Latihan</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            nestedScrollEnabled={true}
            contentContainerStyle={styles.daysScroll}
          >
            {days.map(day => {
              const isSelected = selectedDay === day.key;
              return (
                <TouchableOpacity
                  key={day.key}
                  style={[styles.dayCard, isSelected && styles.dayCardSelected]}
                  onPress={() => setSelectedDay(day.key)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dayText, isSelected && styles.dayTextSelected]}>
                    {day.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Bagian 3: Kategori Latihan */}
          <Text style={styles.inputLabel}>Kategori Latihan</Text>
          <View style={styles.categoryRow}>
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.name;
              return (
                <TouchableOpacity
                  key={cat.name}
                  style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                  onPress={() => setSelectedCategory(cat.name)}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name={cat.icon} 
                    size={22} 
                    color={isSelected ? '#fff' : '#64748b'} 
                    style={styles.categoryIcon}
                  />
                  <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Bagian 4: Durasi */}
          <Text style={styles.inputLabel}>Durasi Latihan (Menit)</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="time-outline" size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: 45"
              placeholderTextColor="#94a3b8"
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
          </View>

          {/* Bagian 5: Catatan Gerakan */}
          <Text style={styles.inputLabel}>Catatan Gerakan / Rencana</Text>
          <View style={[styles.inputContainer, styles.textAreaContainer]}>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Masukkan instruksi set, repetisi, atau fokus gerakan..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
            />
          </View>

          {/* Tombol Simpan Jadwal */}
          <TouchableOpacity 
            style={styles.saveButton} 
            onPress={handleSave}
            activeOpacity={0.8}
          >
            <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.saveButtonText}>Simpan Jadwal</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddScheduleFormScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
  },
  daysScroll: {
    paddingVertical: 4,
  },
  dayCard: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 46,
    alignItems: 'center',
  },
  dayCardSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  dayTextSelected: {
    color: '#fff',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryCardSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  textAreaContainer: {
    height: 120,
    paddingVertical: 12,
    alignItems: 'flex-start',
  },
  textAreaInput: {
    height: '100%',
    textAlignVertical: 'top',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 18,
    height: 56,
    marginTop: 32,
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
