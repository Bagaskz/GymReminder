import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabase';

const ProfileScreen = ({ navigation, schedules, resetSchedules }) => {
  const totalWorkouts = schedules.length;
  const totalDuration = schedules.reduce((total, item) => total + (parseInt(item.duration) || 0), 0);

  const handleLogout = () => {
    Alert.alert(
      "Keluar Akun",
      "Apakah Anda yakin ingin keluar dari akun ini?",
      [
        { text: "Batal", style: "cancel" },
        { 
          text: "Keluar", 
          style: "destructive", 
          onPress: async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) {
                throw error;
              }
            } catch (error) {
              Alert.alert("Error", "Gagal keluar dari akun.");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil Saya</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Bagas Kurniawan</Text>
          <View style={styles.badgeContainer}>
            <Ionicons name="trophy" size={14} color="#E2B93B" />
            <Text style={styles.badgeText}>Elite Athlete</Text>
          </View>

          <View style={styles.statsOverviewRow}>
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>175 cm</Text>
              <Text style={styles.overviewLabel}>Tinggi</Text>
            </View>
            <View style={styles.dividerLine} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>70 kg</Text>
              <Text style={styles.overviewLabel}>Berat</Text>
            </View>
            <View style={styles.dividerLine} />
            <View style={styles.overviewItem}>
              <Text style={styles.overviewValue}>22.9</Text>
              <Text style={styles.overviewLabel}>BMI (Ideal)</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Statistik Latihan Mingguan</Text>
        <View style={styles.statsGrid}>
          <View style={styles.gridCard}>
            <View style={[styles.iconBg, { backgroundColor: '#e0f2fe' }]}>
              <Ionicons name="calendar" size={24} color="#0284c7" />
            </View>
            <Text style={styles.gridValue}>{totalWorkouts}</Text>
            <Text style={styles.gridLabel}>Jadwal Aktif</Text>
          </View>

          <View style={styles.gridCard}>
            <View style={[styles.iconBg, { backgroundColor: '#ecfdf5' }]}>
              <Ionicons name="time" size={24} color="#059669" />
            </View>
            <Text style={styles.gridValue}>{totalDuration} m</Text>
            <Text style={styles.gridLabel}>Total Target Waktu</Text>
          </View>

          <View style={styles.gridCard}>
            <View style={[styles.iconBg, { backgroundColor: '#fff7ed' }]}>
              <Ionicons name="flame" size={24} color="#ea580c" />
            </View>
            <Text style={styles.gridValue}>5 Hari</Text>
            <Text style={styles.gridLabel}>Streak Latihan</Text>
          </View>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Target Konsistensi</Text>
            <Text style={styles.progressRatio}>{totalWorkouts} / 5 Latihan</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${Math.min((totalWorkouts / 5) * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressTip}>
            {totalWorkouts >= 5 
              ? 'Luar biasa! Target latihan mingguan Anda terpenuhi! 🔥' 
              : 'Tambahkan beberapa jadwal latihan lagi untuk memenuhi target 5 hari seminggu.'}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Aksi Akun</Text>
        <View style={styles.settingsGroup}>
          
          <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => {
              Alert.alert(
                "Reset Data",
                "Apakah Anda yakin ingin mereset semua jadwal latihan kembali ke data default di server?",
                [
                  { text: "Batal", style: "cancel" },
                  { 
                    text: "Reset", 
                    style: "destructive", 
                    onPress: async () => {
                      await resetSchedules();
                    }
                  }
                ]
              );
            }}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="refresh-circle-outline" size={22} color="#0284c7" />
              <Text style={styles.settingLabelText}>Reset Data ke Default</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#0284c7" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.settingItem, styles.resetItem]} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="log-out-outline" size={22} color="#ef4444" />
              <Text style={[styles.settingLabelText, styles.resetText]}>Keluar Akun (Logout)</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#ef4444" />
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: '#e2e8f0',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef9c3',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginTop: 6,
  },
  badgeText: {
    color: '#854d0e',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
  },
  statsOverviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  overviewItem: {
    alignItems: 'center',
  },
  overviewValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  overviewLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  dividerLine: {
    width: 1,
    height: 30,
    backgroundColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginTop: 24,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    width: '31%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  iconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  gridLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    textAlign: 'center',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  progressRatio: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressTip: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 10,
    lineHeight: 18,
  },
  settingsGroup: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginLeft: 12,
  },
  resetItem: {
    borderBottomWidth: 0,
  },
  resetText: {
    color: '#ef4444',
  },
});
