import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WorkoutDetailScreen from '../screens/WorkoutDetailScreen';
import AddScheduleFormScreen from '../screens/AddScheduleFormScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Komponen Navigator Bottom Tab
const MainTabs = ({ schedules, isLoading, deleteWorkout, toggleWorkoutCompleted, categories, resetSchedules }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Stats') {
            iconName = focused ? 'analytics' : 'analytics-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9',
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        }
      })}
    >
      {/* Tab 1: Dashboard Utama */}
      <Tab.Screen 
        name="Home" 
        options={{ title: 'Home' }}
        children={(props) => (
          <HomeScreen 
            {...props} 
            schedules={schedules} 
            isLoading={isLoading}
            deleteWorkout={deleteWorkout} 
            toggleWorkoutCompleted={toggleWorkoutCompleted}
            categories={categories} 
          />
        )}
      />

      {/* Tab 2: Statistik & Tantangan (Di Tengah) */}
      <Tab.Screen 
        name="Stats" 
        options={{ title: 'Aktivitas' }}
        component={StatsScreen}
      />

      {/* Tab 3: Profil Saya */}
      <Tab.Screen 
        name="Profile" 
        options={{ title: 'Profil' }}
        children={(props) => (
          <ProfileScreen 
            {...props} 
            schedules={schedules} 
            resetSchedules={resetSchedules}
          />
        )}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = ({ schedules, isLoading, deleteWorkout, addWorkout, editWorkout, toggleWorkoutCompleted, categories, resetSchedules }) => {
  return (
    <NavigationContainer>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Stack.Navigator 
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f8fafc' },
          gestureEnabled: true,
        }}
      >
        {/* MainTabs yang membungkus Bottom Tab Navigator */}
        <Stack.Screen 
          name="MainTabs" 
          children={(props) => (
            <MainTabs 
              {...props} 
              schedules={schedules} 
              isLoading={isLoading}
              deleteWorkout={deleteWorkout} 
              toggleWorkoutCompleted={toggleWorkoutCompleted}
              categories={categories} 
              resetSchedules={resetSchedules}
            />
          )}
        />

        {/* Rute Detail: Di luar Tab agar menyembunyikan Tab Bar */}
        <Stack.Screen 
          name="WorkoutDetail" 
          children={(props) => (
            <WorkoutDetailScreen 
              {...props} 
              schedules={schedules} 
            />
          )}
        />

        {/* Rute Form Tambah/Edit Jadwal: Di luar Tab agar menyembunyikan Tab Bar */}
        <Stack.Screen 
          name="AddScheduleForm" 
          children={(props) => (
            <AddScheduleFormScreen 
              {...props} 
              addWorkout={addWorkout}
              editWorkout={editWorkout}
              schedules={schedules}
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
