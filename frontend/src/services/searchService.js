import api from './api';

export const searchDatabase = async (query) => {
  // If the search bar is empty, don't bother hitting the backend
  if (!query) return { songs: [], playlists: [] };
  
  const response = await api.get(`/search?q=${query}`);
  return response.data; // Returns an object: { songs: [...], playlists: [...] }
};