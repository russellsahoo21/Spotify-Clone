import { useState } from 'react';
import { autoAddSong } from '../../services/songService';

const AddSongModal = ({ isOpen, onClose, onSongAdded }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const newSong = await autoAddSong(url);
      setUrl(''); // Clear input
      onSongAdded(newSong); // Trigger a refresh if needed
      onClose(); // Close modal
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add song. Check the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
      <div className="bg-spotify-light w-full max-w-md p-6 rounded-lg shadow-2xl relative">
        <h2 className="text-2xl font-bold text-white mb-6">Add a Song</h2>
        
        {error && <div className="bg-red-500/10 text-red-500 border border-red-500 p-3 rounded mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-white text-sm font-bold mb-2 block">YouTube URL</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-spotify-dark text-white border border-transparent focus:border-spotify-grey rounded p-3 outline-none transition"
            />
            <p className="text-spotify-grey text-xs mt-2">
              Paste a YouTube link. We'll grab the title, artist, and cover art automatically.
            </p>
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
              disabled={loading || !url}
              className="bg-spotify-green text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Fetching...' : 'Add Song'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSongModal;