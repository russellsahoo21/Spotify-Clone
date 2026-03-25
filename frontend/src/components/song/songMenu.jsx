import { useState, useEffect, useRef } from 'react';
import { FiMoreHorizontal, FiPlus } from 'react-icons/fi';
import { getUserPlaylists } from '../../services/playlistService';
import { addSongToPlaylist } from '../../services/playlistService';

const SongMenu = ({ song }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const menuRef = useRef(null);

  // Fetch playlists when the menu is opened
  useEffect(() => {
    if (isOpen) {
      const fetchPlaylists = async () => {
        try {
          const data = await getUserPlaylists();
          setPlaylists(data);
        } catch (error) {
          console.error("Failed to load playlists");
        }
      };
      fetchPlaylists();
    }
  }, [isOpen]);

  // Close menu if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await addSongToPlaylist(playlistId, song._id);
      alert('Added to playlist!'); // You can replace this with a nice toast notification later!
      setIsOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to add song');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* The 3 Dots Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
        className="text-spotify-grey hover:text-white p-2 transition"
      >
        <FiMoreHorizontal size={20} />
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[#282828] rounded-md shadow-2xl z-50 overflow-hidden border border-white/10">
          <div className="px-4 py-2 text-xs font-bold text-spotify-grey border-b border-white/10 uppercase tracking-wider">
            Add to Playlist
          </div>
          
          <div className="max-h-48 overflow-y-auto custom-scrollbar">
            {playlists.length === 0 ? (
              <div className="px-4 py-3 text-sm text-spotify-grey">No playlists found</div>
            ) : (
              playlists.map((playlist) => (
                <button
                  key={playlist._id}
                  onClick={(e) => { e.stopPropagation(); handleAddToPlaylist(playlist._id); }}
                  className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition flex items-center gap-3"
                >
                  <FiPlus size={14} className="text-spotify-grey" />
                  <span className="truncate">{playlist.name}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongMenu;