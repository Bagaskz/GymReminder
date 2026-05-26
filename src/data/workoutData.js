// Data statis untuk inisialisasi jadwal latihan default
export const initialSchedules = [
  { 
    id: '1', 
    title: 'Leg Day', 
    day: 'Monday', 
    category: 'Strength',
    duration: 45,
    notes: 'Fokus pada Squads, Romanian Deadlifts, dan Calf Raises. Istirahat 90 detik antar set.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.kHRTsoaOdP87Ksj21XLH5gHaE8?pid=Api&h=220&P=0' 
  },
  { 
    id: '2', 
    title: 'Cardio High', 
    day: 'Tuesday', 
    category: 'Cardio',
    duration: 30,
    notes: 'Latihan treadmill interval: 1 menit sprint, 2 menit jogging santai. Ulangi selama 30 menit.',
    image: 'https://cdn.mos.cms.futurecdn.net/5QV4TcUWvsfYmm9hAdWXHD.jpg' 
  },
  { 
    id: '3', 
    title: 'Yoga Flex', 
    day: 'Friday', 
    category: 'Yoga',
    duration: 40,
    notes: 'Fokus pada peregangan hamstring, bahu, dan punggung bawah untuk meningkatkan mobilitas.',
    image: 'https://gymgeek.com/wp-content/uploads/2024/01/back-day-workout-1024x576.jpeg' 
  }
];

// Data kategori latihan
export const categories = [
  { name: 'Strength', icon: 'barbell' },
  { name: 'Cardio', icon: 'fitness' },
  { name: 'Yoga', icon: 'body' }
];

// Preset gambar HD untuk masing-masing kategori
export const presetImages = {
  Strength: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  Cardio: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  Yoga: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80'
};
