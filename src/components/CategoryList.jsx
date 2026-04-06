import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Komponen untuk menampilkan daftar kategori workout secara horizontal
const CategoryList = ({ categories }) => {
  return (
    // ScrollView digunakan agar kategori bisa di-scroll ke samping
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      
      {/* Mapping data kategori menjadi beberapa card */}
      {categories.map((item, index) => (
        <View key={index} style={styles.card}>
          
          {/* Icon kategori */}
          <MaterialCommunityIcons name={item.icon} size={20} color="#4CAF50" />
          
          {/* Nama kategori */}
          <Text style={styles.text}>{item.name}</Text>
        </View>
      ))}

    </ScrollView>
  );
};

export default CategoryList;

// Style untuk tampilan kategori
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', // icon dan text sejajar
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    marginRight: 10,
    elevation: 3 // efek bayangan (Android)
  },
  text: {
    marginLeft: 6,
    fontWeight: '500'
  }
});