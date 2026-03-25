import { Link } from 'react-router-dom';
import { FiHome, FiSearch, FiBook, FiPlusSquare } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="hidden md:flex w-64 bg-black h-full flex-col text-spotify-grey p-6 gap-6 shrink-0 z-10">
      {/* Logo */}
      <div className="text-white font-bold text-2xl mb-4 tracking-tighter">
        Spotify<span className="text-spotify-green">Clone</span>
      </div>

      {/* Main Nav Links */}
      <nav className="flex flex-col gap-4 font-semibold border-b border-spotify-light pb-6">
        <Link to="/" className="flex items-center gap-4 hover:text-white transition">
          <FiHome size={24} /> Home
        </Link>
        <Link to="/search" className="flex items-center gap-4 hover:text-white transition">
          <FiSearch size={24} /> Search
        </Link>
        <Link to="/library" className="flex items-center gap-4 hover:text-white transition">
          <FiBook size={24} /> Your Library
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex flex-col gap-4 font-semibold mt-2">
        {/* Changed from a <button> to a <Link> */}
        <Link 
          to="/add-song"
          className="flex items-center gap-4 hover:text-white transition group"
        >
          <div className="bg-spotify-grey group-hover:bg-white text-black p-1 rounded-sm transition flex items-center justify-center">
            <FiPlusSquare size={16} />
          </div>
          <span>Add Song</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;