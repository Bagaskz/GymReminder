import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://qhspaufzigflglxwauny.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_BT8ZQ2p0uHPqGTp3r88-DQ_k-IGZEVw';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Penting untuk mencegah error penanganan url di React Native
  },
});
