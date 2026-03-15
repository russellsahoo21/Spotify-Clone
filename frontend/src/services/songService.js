import api from './api';

// Fetch all songs for the Home page
export const getAllSongs = async () => {
  const response = await api.get('/songs');
  return response.data; 
};

// Add a new song via YouTube URL
export const autoAddSong = async (url) => {
  const response = await api.post('/songs/auto-add', { url });
  return response.data;
};