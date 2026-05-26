import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const WorkoutDetailScreen = ({ route, navigation, schedules }) => {
  const { id } = route.params;

  const workout = schedules.find(item => item.id === id);

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (workout) {
      setTimeLeft(workout.duration * 60);
      setIsRunning(false);
      setIsCompleted(false);
    }
  }, [workout]);

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
      Alert.alert(
        'Latihan Selesai! 🎉',
        'Luar biasa! Anda telah menyelesaikan sesi latihan ini dengan sukses. Istirahat sejenak lalu hidrasi tubuh Anda.',
        [{ text: 'Keren!', onPress: () => setIsCompleted(false) }]
      );
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  if (!workout) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>Jadwal latihan tidak ditemukan.</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(workout.duration * 60);
    setIsCompleted(false);
  };

  const adjustTime = (amount) => {
    setTimeLeft(prev => {
      const newTime = prev + amount;
      return newTime < 0 ? 0 : newTime;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: workout.image }} style={styles.image} />
          
          <TouchableOpacity style={styles.overlayBackBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.overlayCategoryBadge}>
            <Text style={styles.categoryBadgeText}>{workout.category}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#64748b" />
              <Text style={styles.metaText}>{workout.day}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#64748b" />
              <Text style={styles.metaText}>{workout.duration} Menit</Text>
            </View>
          </View>

          <Text style={styles.title}>{workout.title}</Text>
          
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Catatan Latihan</Text>
          <Text style={styles.notesText}>{workout.notes}</Text>

          <View style={styles.divider} />

          <View style={styles.timerCard}>
            <Text style={styles.timerCardTitle}>Timer Sesi Olahraga</Text>
            
            <Text style={[styles.timerText, isCompleted && styles.completedTimerText]}>
              {formatTime(timeLeft)}
            </Text>

            <View style={styles.adjustRow}>
              <TouchableOpacity 
                style={styles.adjustButton} 
                onPress={() => adjustTime(-60)}
                disabled={timeLeft < 60 || isRunning}
              >
                <Text style={styles.adjustButtonText}>-1 Menit</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.adjustButton} 
                onPress={() => adjustTime(60)}
                disabled={isRunning}
              >
                <Text style={styles.adjustButtonText}>+1 Menit</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.controlRow}>
              <TouchableOpacity style={[styles.controlBtn, styles.resetBtn]} onPress={resetTimer}>
                <Ionicons name="refresh-outline" size={24} color="#64748b" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.controlBtn, 
                  isRunning ? styles.pauseBtn : styles.playBtn
                ]} 
                onPress={toggleTimer}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={isRunning ? "pause" : "play"} 
                  size={28} 
                  color="#fff" 
                  style={!isRunning ? { marginLeft: 4 } : null}
                />
              </TouchableOpacity>

              <View style={[styles.controlBtn, styles.placeholderBtn]}>
                <Ionicons name="barbell-outline" size={24} color="#cbd5e1" />
              </View>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    marginBottom: 20,
  },
  backBtn: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  backBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlayBackBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayCategoryBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
  },
  categoryBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    padding: 20,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    marginLeft: 6,
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22,
  },
  timerCard: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  timerCardTitle: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 48,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  completedTimerText: {
    color: '#f43f5e',
  },
  adjustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  adjustButton: {
    backgroundColor: '#334155',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  adjustButtonText: {
    color: '#f8fafc',
    fontSize: 12,
    fontWeight: '600',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  controlBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetBtn: {
    backgroundColor: '#334155',
  },
  playBtn: {
    backgroundColor: '#4CAF50',
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  pauseBtn: {
    backgroundColor: '#ef4444',
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  placeholderBtn: {
    backgroundColor: 'transparent',
  },
});
