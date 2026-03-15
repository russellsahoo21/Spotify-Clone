import { useState, useEffect, useContext } from 'react';
import { getAllSongs } from '../services/songService';
import { PlayerContext } from '../context/PlayerContext';
import { FaPlay } from 'react-icons/fa'; // Import a play icon
import SongCard from '../components/song/SongCard';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const { playSong } = useContext(PlayerContext);

  useEffect(() => {
    // Fetch songs from the backend when the component loads
    const fetchSongs = async () => {
      try {
        const data = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.error('Failed to fetch songs', error);
      }
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Good evening</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* We map through the songs, but pass the rendering job to the SongCard! */}
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
        
        {songs.length === 0 && (
          <p className="text-spotify-grey col-span-full">
            No songs found. Upload some to your database using Postman!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;