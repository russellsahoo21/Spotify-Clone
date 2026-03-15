import api from './api';

// Get all playlists for the logged-in user
export const getUserPlaylists = async () => {
  const response = await api.get('/playlists');
  return response.data;
};

// Get a single playlist by its ID (includes populated songs)
export const getPlaylistById = async (id) => {
  const response = await api.get(`/playlists/${id}`);
  return response.data;
};

// Create a new playlist
export const createPlaylist = async (playlistData) => {
  const response = await api.post('/playlists', playlistData);
  return response.data;
};

// Add a song to a playlist
export const addSongToPlaylist = async (playlistId, songId) => {
  const response = await api.post(`/playlists/${playlistId}/add-song`, { songId });
  return response.data;
};