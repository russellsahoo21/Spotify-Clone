import { useState, useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { FaPlay } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { getUserPlaylists, addSongToPlaylist } from '../../services/playlistService';

const SongCard = ({ song }) => {
  const { playSong } = useContext(PlayerContext);
  const [showMenu, setShowMenu] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [loadingPlaylists, setLoadingPlaylists] = useState(false);

  // When the user clicks the three dots, fetch their playlists and open the menu
  const handleMenuClick = async (e) => {
    e.stopPropagation(); // Prevents the card from playing the song
    
    if (!showMenu && playlists.length === 0) {
      setLoadingPlaylists(true);
      try {
        const data = await getUserPlaylists();
        setPlaylists(data);
      } catch (error) {
        console.error('Failed to load playlists', error);
      }
      setLoadingPlaylists(false);
    }
    
    setShowMenu(!showMenu);
  };

  // When the user clicks a specific playlist from the dropdown
  const handleAddToPlaylist = async (e, playlistId) => {
    e.stopPropagation(); // Prevents the card from playing the song
    try {
      await addSongToPlaylist(playlistId, song._id);
      alert('Song added to playlist!'); // You could replace this with a slick Toast notification later!
      setShowMenu(false); // Close the menu
    } catch (error) {
      // If the song is already in the playlist, our backend throws a 400 error.
      alert(error.response?.data?.message || 'Failed to add song');
    }
  };

  return (
    <div 
      onClick={() => playSong(song)} 
      className="bg-spotify-light/20 hover:bg-spotify-light/60 transition-all duration-300 p-4 rounded-md cursor-pointer group relative"
    >
      <div className="relative mb-4 shadow-lg">
        <img 
          src={song.coverImage} 
          alt={song.title} 
          className="w-full aspect-square object-cover rounded-md shadow-2xl"
        />
        
        {/* Play Button */}
        <div className="absolute bottom-2 right-2 bg-spotify-green rounded-full p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
          <FaPlay className="text-black pl-1" size={16} />
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div className="overflow-hidden">
          <h2 className="font-bold text-white truncate">{song.title}</h2>
          <p className="text-sm text-spotify-grey mt-1 truncate">{song.artist}</p>
        </div>

        {/* The Options Button (...) */}
        <div className="relative">
          <button 
            onClick={handleMenuClick}
            className="text-spotify-grey hover:text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiMoreVertical size={20} />
          </button>

          {/* The Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-spotify-light border border-white/10 rounded shadow-2xl z-50 py-1">
              <div className="px-4 py-2 text-xs font-bold text-spotify-grey uppercase tracking-wider border-b border-white/10">
                Add to Playlist
              </div>
              
              {loadingPlaylists ? (
                <div className="px-4 py-2 text-sm text-white">Loading...</div>
              ) : playlists.length === 0 ? (
                <div className="px-4 py-2 text-sm text-spotify-grey">No playlists found.</div>
              ) : (
                <div className="max-h-48 overflow-y-auto">
                  {playlists.map((pl) => (
                    <button
                      key={pl._id}
                      onClick={(e) => handleAddToPlaylist(e, pl._id)}
                      className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 transition"
                    >
                      {pl.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongCard;