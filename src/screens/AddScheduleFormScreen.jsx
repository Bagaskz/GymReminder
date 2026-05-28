import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { presetImages } from '../data/workoutData';
import { uploadImage } from '../services/api';

const AddScheduleFormScreen = ({ route, navigation, addWorkout, editWorkout, schedules }) => {
  // State untuk isian formulir
  const [title, setTitle] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedCategory, setSelectedCategory] = useState('Strength');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [localImageUri, setLocalImageUri] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const workoutId = route.params?.workoutId;
  const isEditMode = !!workoutId;

  // Memuat data awal jika berada dalam Mode Edit
  useEffect(() => {
    if (isEditMode && schedules) {
      const existingWorkout = schedules.find(item => item.id === workoutId);
      if (existingWorkout) {
        setTitle(existingWorkout.title);
        setSelectedDay(existingWorkout.day);
        setSelectedCategory(existingWorkout.category);
        setDuration(existingWorkout.duration ? String(existingWorkout.duration) : '');
        setNotes(existingWorkout.notes || '');
        setImageUrl(existingWorkout.image || '');
      }
    } else {
      // Inisialisasi awal URL gambar default kategori saat tambah baru
      setImageUrl(presetImages.Strength);
    }
  }, [workoutId, schedules]);

  // Handler ganti kategori otomatis merubah URL gambar jika belum dicustomize
  const handleCategorySelect = (catName) => {
    setSelectedCategory(catName);
    const isPresetOrEmpty = !imageUrl || Object.values(presetImages).includes(imageUrl);
    if (isPresetOrEmpty) {
      setImageUrl(presetImages[catName]);
    }
  };

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

  // Fungsi memilih gambar dari galeri HP
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Izin Ditolak', 'Aplikasi memerlukan izin akses galeri untuk mengunggah gambar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLocalImageUri(result.assets[0].uri);
    }
  };

  // Callback Simpan Jadwal (Menggunakan REST API POST/PUT & Upload Supabase Storage)
  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Form Belum Lengkap', 'Silakan masukkan nama latihan terlebih dahulu.');
      return;
    }
    
    setIsSaving(true);
    try {
      let finalImageUrl = imageUrl.trim();

      // Jika ada gambar galeri yang dipilih, unggah terlebih dahulu
      if (localImageUri) {
        try {
          finalImageUrl = await uploadImage(localImageUri);
        } catch (uploadError) {
          Alert.alert(
            'Gagal Mengunggah',
            'Gagal menyimpan gambar di server. Menggunakan gambar default kategori.',
            [{ text: 'OK' }]
          );
          finalImageUrl = presetImages[selectedCategory] || presetImages.Strength;
        }
      }

      const workoutData = {
        title: title.trim(),
        day: selectedDay,
        category: selectedCategory,
        duration: parseInt(duration, 10) || 30, // Default 30 menit jika kosong
        notes: notes.trim(),
        image: finalImageUrl || presetImages[selectedCategory] || presetImages.Strength,
        completed: isEditMode ? (schedules.find(item => item.id === workoutId)?.completed ?? false) : false
      };

      let success = false;
      if (isEditMode) {
        success = await editWorkout(workoutId, workoutData);
      } else {
        success = await addWorkout(workoutData);
      }
      
      if (success) {
        Alert.alert(
          'Sukses',
          isEditMode ? 'Jadwal latihan berhasil diperbarui!' : 'Jadwal latihan baru berhasil disimpan!',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat menyimpan jadwal.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Formulir */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#1e293b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isEditMode ? 'Edit Jadwal' : 'Tambah Jadwal'}</Text>
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
                  onPress={() => handleCategorySelect(cat.name)}
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

          {/* Bagian 4.5: Gambar Latihan (Preview & Upload) */}
          <Text style={styles.inputLabel}>Gambar Latihan</Text>
          <View style={styles.imageSelectorContainer}>
            <Image 
              source={{ uri: localImageUri || imageUrl || presetImages[selectedCategory] || presetImages.Strength }} 
              style={styles.imagePreview} 
            />
            <View style={styles.imageSelectorButtons}>
              <TouchableOpacity style={styles.galleryButton} onPress={pickImage} activeOpacity={0.7}>
                <Ionicons name="images-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.galleryButtonText}>Pilih dari Galeri</Text>
              </TouchableOpacity>
              {localImageUri ? (
                <TouchableOpacity 
                  style={styles.clearImageButton} 
                  onPress={() => setLocalImageUri('')} 
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearImageButtonText}>Gunakan Gambar Kategori</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          <Text style={styles.inputLabel}>Atau Gunakan URL Gambar Manual</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="link-outline" size={20} color="#64748b" style={styles.inputIcon} />
            <TextInput
              style={styles.textInput}
              placeholder="Masukkan URL gambar..."
              placeholderTextColor="#94a3b8"
              value={localImageUri ? 'Gambar dari galeri dipilih' : imageUrl}
              onChangeText={(text) => {
                setImageUrl(text);
                setLocalImageUri(''); // Kosongkan jika user ketik URL manual
              }}
              editable={!localImageUri}
              autoCapitalize="none"
              autoCorrect={false}
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
            style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
            onPress={handleSave}
            disabled={isSaving}
            activeOpacity={0.8}
          >
            {isSaving ? (
              <ActivityIndicator size="small" color="#fff" style={{ marginRight: 8 }} />
            ) : (
              <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={{ marginRight: 8 }} />
            )}
            <Text style={styles.saveButtonText}>
              {isSaving ? 'Menyimpan...' : (isEditMode ? 'Simpan Perubahan' : 'Simpan Jadwal')}
            </Text>
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
  saveButtonDisabled: {
    backgroundColor: '#a5d6a7',
    shadowColor: '#a5d6a7',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover',
    backgroundColor: '#f1f5f9',
  },
  imageSelectorButtons: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'center',
  },
  galleryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  galleryButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  clearImageButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    backgroundColor: '#f8fafc',
  },
  clearImageButtonText: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  }
});
