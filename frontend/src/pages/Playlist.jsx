import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from '../services/playlistService';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay, FaClock } from 'react-icons/fa';

const Playlist = () => {
  const { id } = useParams(); // Grabs the dynamic ID from the URL
  const [playlist, setPlaylist] = useState(null);
  const { playSong } = useContext(PlayerContext);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const data = await getPlaylistById(id);
        setPlaylist(data);
      } catch (error) {
        console.error('Error fetching playlist', error);
      }
    };
    fetchPlaylist();
  }, [id]);

  if (!playlist) return <div className="text-white mt-10 ml-10">Loading playlist...</div>;

  return (
    <div className="-m-8"> {/* Negative margin to bleed into the Layout padding */}
      {/* 1. Playlist Header (Big Gradient Area) */}
      <div className="bg-gradient-to-b from-blue-900 to-spotify-dark/30 p-8 flex items-end gap-6 h-64">
        <div className="w-48 h-48 shadow-2xl bg-spotify-dark flex-shrink-0 flex items-center justify-center">
          {playlist.coverImage ? (
            <img src={playlist.coverImage} alt={playlist.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-spotify-grey text-4xl">🎵</span>
          )}
        </div>
        <div className="text-white pb-2">
          <p className="text-sm font-bold uppercase mb-2">Playlist</p>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tighter">{playlist.name}</h1>
          <p className="text-spotify-grey text-sm font-semibold">{playlist.description}</p>
          <p className="text-sm mt-2 font-bold">
            {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
          </p>
        </div>
      </div>

      {/* 2. Song List */}
      <div className="p-8 bg-black/20 min-h-screen">
        {/* Table Header */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 text-spotify-grey border-b border-white/10 pb-2 mb-4 px-4 text-sm font-semibold">
          <div className="w-8 text-center">#</div>
          <div>Title</div>
          <div><FaClock /></div>
        </div>

        {/* Songs Map */}
        <div className="flex flex-col">
          {playlist.songs.map((song, index) => (
            <div 
              key={song._id} 
              onClick={() => playSong(song)}
              className="grid grid-cols-[auto_1fr_auto] gap-4 items-center text-spotify-grey hover:bg-white/10 p-2 px-4 rounded-md cursor-pointer group transition"
            >
              <div className="w-8 text-center flex items-center justify-center">
                <span className="group-hover:hidden">{index + 1}</span>
                <FaPlay className="text-white hidden group-hover:block" size={12} />
              </div>
              
              <div className="flex items-center gap-4 overflow-hidden">
                <img src={song.coverImage} alt={song.title} className="w-10 h-10 object-cover rounded" />
                <div className="truncate">
                  <div className="text-white font-semibold group-hover:underline truncate">{song.title}</div>
                  <div className="text-sm truncate">{song.artist}</div>
                </div>
              </div>

              <div className="text-sm">
                {song.duration}
              </div>
            </div>
          ))}

          {playlist.songs.length === 0 && (
            <div className="text-center mt-10 text-spotify-grey">
              This playlist is currently empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;