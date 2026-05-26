import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Komponen untuk menampilkan daftar kategori workout secara horizontal dan dapat diklik
const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
        
        {/* Kategori "Semua" untuk mereset filter */}
        <TouchableOpacity 
          style={[
            styles.card, 
            !selectedCategory ? styles.activeCard : null
          ]}
          onPress={() => onSelectCategory(null)}
        >
          <Ionicons 
            name="grid-outline" 
            size={20} 
            color={!selectedCategory ? '#fff' : '#4CAF50'} 
          />
          <Text style={[styles.text, !selectedCategory ? styles.activeText : null]}>All</Text>
        </TouchableOpacity>

        {/* Mapping data kategori menjadi beberapa card interaktif */}
        {categories.map((item, index) => {
          const isActive = selectedCategory === item.name;
          return (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.card, 
                isActive ? styles.activeCard : null
              ]}
              onPress={() => onSelectCategory(item.name)}
            >
              
              {/* Icon kategori */}
              <Ionicons 
                name={item.icon} 
                size={20} 
                color={isActive ? '#fff' : '#4CAF50'} 
              />
              
              {/* Nama kategori */}
              <Text style={[styles.text, isActive ? styles.activeText : null]}>{item.name}</Text>
            </TouchableOpacity>
          );
        })}

      </ScrollView>
    </View>
  );
};

export default CategoryList;

// Style untuk tampilan kategori
const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12
  },
  container: {
    paddingHorizontal: 4,
    paddingVertical: 4
  },
  card: {
    flexDirection: 'row', // icon dan text sejajar
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    elevation: 3, // efek bayangan (Android)
    shadowColor: '#000', // bayangan iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeCard: {
    backgroundColor: '#4CAF50',
  },
  text: {
    marginLeft: 6,
    fontWeight: '600',
    color: '#333'
  },
  activeText: {
    color: '#fff'
  }
});