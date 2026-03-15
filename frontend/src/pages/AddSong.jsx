import { useState } from 'react';
import { autoAddSong } from '../services/songService';

const AddSong = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const newSong = await autoAddSong(url);
      setUrl(''); // Clear the input so they can add another
      setSuccess(`Successfully added: ${newSong.title}!`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add song. Check the URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">Add a Song</h1>
      
      <div className="bg-spotify-light/10 p-8 rounded-lg shadow-2xl border border-white/5">
        
        {/* Status Messages */}
        {error && <div className="bg-red-500/10 text-red-500 border border-red-500/50 p-4 rounded mb-6 text-sm">{error}</div>}
        {success && <div className="bg-spotify-green/10 text-spotify-green border border-spotify-green/50 p-4 rounded mb-6 text-sm font-semibold">{success}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label className="text-white text-sm font-bold mb-3 block">YouTube URL</label>
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full bg-black/50 text-white border border-white/10 focus:border-white rounded-md p-4 outline-none transition"
            />
            <p className="text-spotify-grey text-sm mt-3">
              Paste a YouTube link here. Our backend will automatically extract the title, artist, duration, and high-quality cover art.
            </p>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button 
              type="submit"
              disabled={loading || !url}
              className="bg-spotify-green text-black px-8 py-3 rounded-full font-bold hover:scale-105 hover:bg-green-400 transition disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Fetching Data...' : 'Add to Library'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSong;