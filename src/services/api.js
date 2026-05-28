import { supabase } from './supabase';
import * as FileSystem from 'expo-file-system/legacy';
import { decode } from 'base64-arraybuffer';

// GET: Mengambil semua jadwal latihan untuk user aktif
export const getSchedules = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase
      .from('schedules')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true });
      
    if (error) {
      throw error;
    }
    return data || [];
  } catch (error) {
    console.error('Error GET schedules:', error);
    throw error;
  }
};

// POST: Membuat jadwal latihan baru
export const createSchedule = async (scheduleData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User tidak terautentikasi');
    }

    const { data, error } = await supabase
      .from('schedules')
      .insert([
        {
          ...scheduleData,
          user_id: user.id
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error POST schedule:', error);
    throw error;
  }
};

// PUT: Memperbarui jadwal latihan
export const updateSchedule = async (id, updatedData) => {
  try {
    // Hapus field id dari updatedData jika ada, karena id primary key di Supabase tidak boleh diganti
    const { id: _, ...restData } = updatedData;
    
    const { data, error } = await supabase
      .from('schedules')
      .update(restData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error PUT schedule:', error);
    throw error;
  }
};

// DELETE: Menghapus jadwal latihan
export const deleteSchedule = async (id) => {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error DELETE schedule:', error);
    throw error;
  }
};

// UPLOAD: Mengunggah berkas gambar lokal ke bucket 'schedule-images' di Supabase Storage menggunakan ArrayBuffer (sangat aman dari network errors)
export const uploadImage = async (fileUri) => {
  try {
    // 1. Baca berkas gambar lokal sebagai Base64 string
    const base64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: 'base64',
    });

    // 2. Dekode Base64 menjadi ArrayBuffer biner
    const arrayBuffer = decode(base64);

    // 3. Tentukan nama berkas acak yang unik berdasarkan waktu
    const fileExt = fileUri.split('.').pop().toLowerCase() || 'jpg';
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 100000)}.${fileExt}`;
    const filePath = `${fileName}`;

    // 4. Unggah ArrayBuffer ke Supabase Storage
    const { data, error } = await supabase.storage
      .from('schedule-images')
      .upload(filePath, arrayBuffer, {
        contentType: `image/${fileExt === 'png' ? 'png' : 'jpeg'}`,
        upsert: true
      });

    if (error) {
      throw error;
    }

    // 5. Ambil URL Publik
    const { data: { publicUrl } } = supabase.storage
      .from('schedule-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error upload image:', error);
    throw error;
  }
};
