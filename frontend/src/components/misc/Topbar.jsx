import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../../context/PlayerContext';
import { FiSearch } from 'react-icons/fi';
import { FaSpotify } from 'react-icons/fa';

const Topbar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { isExpanded } = useContext(PlayerContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${query}`);
  };

  if (isExpanded) return null;

  return (
    <header className="md:hidden w-full bg-black p-4 flex items-center gap-3 z-[40]">
      {/* Logo on the Left */}
      <div className="text-[#1DB954] shrink-0">
        <FaSpotify size={32} />
      </div>

      {/* Search Bar on the Right */}
      <form onSubmit={handleSearch} className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to play?"
          className="w-full bg-[#242424] border-none rounded-md py-2.5 pl-10 pr-4 text-white text-sm outline-none focus:bg-[#2a2a2a]"
        />
      </form>
    </header>
  );
};

export default Topbar;