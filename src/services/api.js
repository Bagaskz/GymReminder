const BASE_URL = 'https://6a16fbe91b90031f81b1d662.mockapi.io/schedules';

// GET: Mengambil semua jadwal latihan
export const getSchedules = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Gagal mengambil data dari server');
    }
    return await response.json();
  } catch (error) {
    console.error('Error GET schedules:', error);
    throw error;
  }
};

// POST: Membuat jadwal latihan baru
export const createSchedule = async (scheduleData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...scheduleData,
        completed: false, // Default status latihan belum selesai
      }),
    });
    if (!response.ok) {
      throw new Error('Gagal menyimpan data baru');
    }
    return await response.json();
  } catch (error) {
    console.error('Error POST schedule:', error);
    throw error;
  }
};

// PUT: Memperbarui jadwal latihan (misalnya status selesai)
export const updateSchedule = async (id, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error('Gagal memperbarui data latihan');
    }
    return await response.json();
  } catch (error) {
    console.error('Error PUT schedule:', error);
    throw error;
  }
};

// DELETE: Menghapus jadwal latihan
export const deleteSchedule = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Gagal menghapus data latihan');
    }
    return await response.json();
  } catch (error) {
    console.error('Error DELETE schedule:', error);
    throw error;
  }
};
