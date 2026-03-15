// 1. Add these new imports
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserPlaylists } from '../services/playlistService';
import { FiMusic } from 'react-icons/fi';
import CreatePlaylistModal from '../components/playlist/CreatePlaylistModal'; // <-- Import Modal

const Library = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 2. Add state to manage the modal
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const data = await getUserPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Failed to fetch playlists', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  // 3. Helper function to instantly update the UI when a new playlist is created
  const handlePlaylistCreated = (newPlaylist) => {
    setPlaylists([newPlaylist, ...playlists]); // Add the new one to the top of the list!
  };

  if (loading) return <div className="text-white">Loading your library...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">Your Library</h1>
        
        {/* 4. Wire up the button to open the modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full font-semibold transition"
        >
          + Create Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <div className="text-center mt-20 text-spotify-grey">
          <FiMusic className="mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-white">Create your first playlist</h2>
          <p className="mt-2">It's easy, we'll help you.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
             <Link 
              to={`/playlist/${playlist._id}`} 
              key={playlist._id}
              className="bg-spotify-light/20 hover:bg-spotify-light/60 transition-all duration-300 p-4 rounded-md cursor-pointer"
            >
               {/* ... (Keep your existing playlist card HTML here) ... */}
               <div className="aspect-square bg-spotify-dark rounded-md mb-4 shadow-lg flex items-center justify-center overflow-hidden">
                {playlist.coverImage ? (
                  <img src={playlist.coverImage} alt={playlist.name} className="w-full h-full object-cover" />
                ) : (
                  <FiMusic size={40} className="text-spotify-grey" />
                )}
              </div>
              <h2 className="font-bold text-white truncate">{playlist.name}</h2>
              <p className="text-sm text-spotify-grey mt-1 line-clamp-2">{playlist.description}</p>
            </Link>
          ))}
        </div>
      )}

      {/* 5. Render the Modal at the bottom of the component */}
      <CreatePlaylistModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onPlaylistCreated={handlePlaylistCreated}
      />
    </div>
  );
};

export default Library;