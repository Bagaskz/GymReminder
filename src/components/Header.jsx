import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ onProfilePress }) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.leftContainer}>
        <View style={styles.logoBg}>
          <Ionicons name="fitness" size={20} color="#4CAF50" />
        </View>
        <Text style={styles.title}>Gym Reminder</Text>
      </View>

      <TouchableOpacity 
        style={styles.profileButton} 
        onPress={onProfilePress}
        activeOpacity={0.7}
      >
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&auto=format&fit=crop&q=80' }}
          style={styles.avatarMini}
        />
      </TouchableOpacity>

    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMini: {
    width: '100%',
    height: '100%',
  }
});