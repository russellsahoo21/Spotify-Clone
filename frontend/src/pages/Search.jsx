import { useState, useEffect, useContext } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaPlay } from 'react-icons/fa';
import { searchDatabase } from '../services/searchService';
import { PlayerContext } from '../context/PlayerContext';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ songs: [], playlists: [] });
  const [isSearching, setIsSearching] = useState(false);
  const { playSong } = useContext(PlayerContext);

  useEffect(() => {
    // Debounce logic: Wait 500ms after the user stops typing to fetch
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim() !== '') {
        setIsSearching(true);
        try {
          const data = await searchDatabase(query);
          setResults(data);
        } catch (error) {
          console.error('Search failed', error);
        }
        setIsSearching(false);
      } else {
        setResults({ songs: [], playlists: [] }); // Clear results if input is empty
      }
    }, 500);

    // Cleanup function that runs if the user keeps typing before 500ms is up
    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Search Bar Header */}
      <div className="sticky top-0 z-10 bg-spotify-dark/95 pb-4 pt-2">
        <div className="relative w-full max-w-md">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-spotify-grey" size={24} />
          <input
            type="text"
            className="w-full bg-white/10 text-white placeholder-spotify-grey border-2 border-transparent focus:border-white focus:bg-spotify-light rounded-full py-3 pl-12 pr-4 outline-none transition-all"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Loading State */}
      {isSearching && <p className="text-spotify-grey">Searching...</p>}

      {/* 3. Song Results */}
      {results.songs.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Songs</h2>
          <div className="flex flex-col gap-2">
            {results.songs.map((song) => (
              <div 
                key={song._id} 
                onClick={() => playSong(song)}
                className="flex items-center gap-4 p-2 rounded-md hover:bg-white/10 cursor-pointer group transition-colors"
              >
                <div className="relative h-12 w-12 flex-shrink-0">
                  <img src={song.coverImage} alt={song.title} className="h-full w-full object-cover rounded" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FaPlay className="text-white" size={14} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-semibold">{song.title}</span>
                  <span className="text-spotify-grey text-sm">{song.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. No Results State */}
      {query && !isSearching && results.songs.length === 0 && results.playlists.length === 0 && (
        <div className="text-center mt-10">
          <h2 className="text-xl font-bold text-white">No results found for "{query}"</h2>
          <p className="text-spotify-grey mt-2">Please make sure your words are spelled correctly or use less or different keywords.</p>
        </div>
      )}
    </div>
  );
};

export default Search;