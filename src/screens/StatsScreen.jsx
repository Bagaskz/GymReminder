import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const StatsScreen = () => {
  // State untuk tantangan harian
  const [challenges, setChallenges] = useState([
    { id: '1', title: 'Tantangan Plank', description: 'Tahan plank selama 2 menit berturut-turut', completed: false, icon: 'time' },
    { id: '2', title: 'Target Hidrasi', description: 'Minum minimal 2.5 liter air hari ini', completed: true, icon: 'water' },
    { id: '3', title: 'Langkah Kaki', description: 'Jalan kaki minimal 8.000 langkah', completed: false, icon: 'walk' },
    { id: '4', title: 'Peregangan Pagi', description: 'Lakukan yoga/peregangan selama 10 menit', completed: false, icon: 'body' },
  ]);

  // Fungsi toggle penyelesaian tantangan
  const toggleChallenge = (id) => {
    setChallenges(prev => 
      prev.map(ch => {
        if (ch.id === id) {
          const nextState = !ch.completed;
          if (nextState) {
            Alert.alert(
              'Kerja Bagus! 🎉',
              `Anda telah menyelesaikan "${ch.title}"! Tetap konsisten untuk menjaga performamu.`,
              [{ text: 'Lanjutkan' }]
            );
          }
          return { ...ch, completed: nextState };
        }
        return ch;
      })
    );
  };

  // Menghitung statistik tantangan hari ini
  const completedCount = challenges.filter(c => c.completed).length;
  const totalCount = challenges.length;
  const challengeProgress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Halaman */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Statistik & Aktivitas</Text>
        <View style={styles.headerIconBg}>
          <Ionicons name="analytics" size={20} color="#4CAF50" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        {/* Ringkasan Kemajuan Mingguan */}
        <View style={styles.summaryCard}>
          <Text style={styles.cardSubtitle}>KONSISTENSI MINGGU INI</Text>
          <Text style={styles.cardTitle}>Pejuang Kebugaran 🔥</Text>
          
          <View style={styles.progressSection}>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressPercentage}>{Math.round(challengeProgress)}%</Text>
              <Text style={styles.progressLabel}>Target harian selesai</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${challengeProgress}%` }]} />
            </View>
          </View>

          <View style={styles.statsSummaryRow}>
            <View style={styles.statBox}>
              <Text style={styles.statVal}>840</Text>
              <Text style={styles.statLbl}>Kkal Terbakar</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statVal}>120</Text>
              <Text style={styles.statLbl}>Menit Aktif</Text>
            </View>
            <View style={styles.verticalDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statVal}>4 Hari</Text>
              <Text style={styles.statLbl}>Latihan Rutin</Text>
            </View>
          </View>
        </View>

        {/* Statistik Mingguan (Tampilan Bar Sederhana) */}
        <Text style={styles.sectionTitle}>Ringkasan Aktivitas</Text>
        <View style={styles.activityChartCard}>
          <Text style={styles.chartTitle}>Grafik Menit Latihan Harian</Text>
          
          <View style={styles.chartContainer}>
            {[
              { day: 'Sen', val: 40, active: true },
              { day: 'Sel', val: 30, active: true },
              { day: 'Rab', val: 0, active: false },
              { day: 'Kam', val: 50, active: true },
              { day: 'Jum', val: 0, active: false },
              { day: 'Sab', val: 0, active: false },
              { day: 'Min', val: 0, active: false }
            ].map((item, idx) => (
              <View key={idx} style={styles.chartBarCol}>
                <View style={styles.chartBarBg}>
                  <View 
                    style={[
                      styles.chartBarFill, 
                      { height: `${(item.val / 60) * 100}%` },
                      item.active && styles.chartBarActiveFill
                    ]} 
                  />
                </View>
                <Text style={styles.chartDayText}>{item.day}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.chartInfoRow}>
            <Ionicons name="information-circle-outline" size={16} color="#64748b" />
            <Text style={styles.chartInfoText}>Latihan terpanjang Anda di minggu ini adalah hari Kamis (50 menit).</Text>
          </View>
        </View>

        {/* Daftar Tantangan Kebugaran Hari Ini */}
        <View style={styles.challengesHeader}>
          <Text style={styles.sectionTitle}>Tantangan Kebugaran</Text>
          <Text style={styles.challengesRatio}>{completedCount}/{totalCount} Selesai</Text>
        </View>

        {challenges.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[styles.challengeItem, item.completed && styles.challengeItemCompleted]}
            onPress={() => toggleChallenge(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.challengeLeft}>
              <View style={[styles.iconBg, item.completed ? styles.iconBgCompleted : styles.iconBgActive]}>
                <Ionicons 
                  name={item.completed ? 'checkmark-circle' : item.icon} 
                  size={20} 
                  color={item.completed ? '#4CAF50' : '#64748b'} 
                />
              </View>
              <View style={styles.challengeMeta}>
                <Text style={[styles.challengeTitleText, item.completed && styles.challengeTextCompleted]}>
                  {item.title}
                </Text>
                <Text style={styles.challengeDescText}>{item.description}</Text>
              </View>
            </View>
            
            <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
              {item.completed && <Ionicons name="checkmark" size={12} color="#fff" />}
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

export default StatsScreen;

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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  headerIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  summaryCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    marginTop: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardSubtitle: {
    color: '#4CAF50',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressTextRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  progressPercentage: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  progressLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginLeft: 8,
    fontWeight: '600',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  statsSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  statLbl: {
    color: '#64748b',
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#334155',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginTop: 24,
    marginBottom: 12,
  },
  activityChartCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  chartTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 16,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 100,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  chartBarCol: {
    alignItems: 'center',
    flex: 1,
  },
  chartBarBg: {
    width: 12,
    height: 80,
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: '#cbd5e1',
    borderRadius: 6,
  },
  chartBarActiveFill: {
    backgroundColor: '#4CAF50',
  },
  chartDayText: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 6,
    fontWeight: '600',
  },
  chartInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  chartInfoText: {
    fontSize: 11,
    color: '#64748b',
    marginLeft: 6,
    flex: 1,
  },
  challengesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  challengesRatio: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '700',
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  challengeItemCompleted: {
    borderColor: '#e8f5e9',
    backgroundColor: '#fbfdfb',
  },
  challengeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconBgActive: {
    backgroundColor: '#f1f5f9',
  },
  iconBgCompleted: {
    backgroundColor: '#e8f5e9',
  },
  challengeMeta: {
    flex: 1,
    paddingRight: 8,
  },
  challengeTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
  },
  challengeTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  challengeDescText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  }
});
