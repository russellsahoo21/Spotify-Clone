import { useState, useEffect, useContext } from 'react';
import { getAllSongs } from '../services/songService';
import { PlayerContext } from '../context/PlayerContext';
import SongCard from '../components/song/SongCard';
import SongSkeleton from '../components/song/SongSkeleton'; // Import the skeleton

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { playSong } = useContext(PlayerContext);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true); // Ensure loading is true when fetch starts
        const data = await getAllSongs();
        setSongs(data);
      } catch (error) {
        console.error('Failed to fetch songs', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };
    fetchSongs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Good evening</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {loading ? (
          // Show 5-10 skeletons while loading
          Array.from({ length: 10 }).map((_, index) => (
            <SongSkeleton key={index} />
          ))
        ) : songs.length > 0 ? (
          // Show actual songs
          songs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))
        ) : (
          // Only show this if loading is finished and array is still empty
          <p className="text-spotify-grey col-span-full">
            No songs found. Head over to the Add Song page to build your library!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;