import { useState } from 'react';
import { createPlaylist } from '../../services/playlistService';

const CreatePlaylistModal = ({ isOpen, onClose, onPlaylistCreated }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; // Don't render anything if the modal is closed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newPlaylist = await createPlaylist({ name, description });
      onPlaylistCreated(newPlaylist); // Pass the new playlist back to the parent to update the UI
      setName('');
      setDescription('');
      onClose(); // Close the modal
    } catch (error) {
      console.error('Failed to create playlist', error);
      alert('Failed to create playlist');
    } finally {
      setLoading(false);
    }
  };

  return (
    // The dark background overlay
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      {/* The modal box */}
      <div className="bg-spotify-light w-full max-w-md p-6 rounded-lg shadow-2xl relative">
        <h2 className="text-2xl font-bold text-white mb-6">Create Playlist</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome Playlist"
              className="w-full bg-spotify-dark text-white border border-transparent focus:border-spotify-grey rounded p-3 outline-none transition"
            />
          </div>
          
          <div>
            <label className="text-white text-sm font-bold mb-2 block">Description <span className="text-spotify-grey font-normal">(optional)</span></label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Give your playlist a catchy description"
              rows="3"
              className="w-full bg-spotify-dark text-white border border-transparent focus:border-spotify-grey rounded p-3 outline-none transition resize-none"
            />
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <button 
              type="button" 
              onClick={onClose}
              className="text-white font-bold hover:scale-105 transition"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="bg-spotify-green text-black px-6 py-2 rounded-full font-bold hover:scale-105 hover:bg-green-400 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;