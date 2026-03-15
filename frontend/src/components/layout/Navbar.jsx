import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaChevronLeft, FaChevronRight, FaUserAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login'); // Kick them back to the login screen
  };

  return (
    <div className="h-16 bg-spotify-dark/90 sticky top-0 z-50 flex items-center justify-between px-8">
      
      {/* 1. Left Side: Navigation History Arrows */}
      <div className="flex gap-4">
        <button 
          onClick={() => navigate(-1)} 
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition cursor-pointer"
          title="Go back"
        >
          <FaChevronLeft className="pr-1" />
        </button>
        <button 
          onClick={() => navigate(1)} 
          className="w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition cursor-pointer"
          title="Go forward"
        >
          <FaChevronRight className="pl-1" />
        </button>
      </div>
      
      {/* 2. Right Side: User Profile or Login/Register */}
      <div>
        {user ? (
          <div className="relative">
            {/* The Profile "Pill" Button */}
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-black hover:bg-spotify-light p-1 pr-3 rounded-full transition-colors border border-transparent focus:border-white"
            >
              <div className="w-7 h-7 bg-spotify-light rounded-full flex items-center justify-center overflow-hidden">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.username} className="w-full h-full object-cover" />
                ) : (
                  <FaUserAlt className="text-spotify-grey text-sm" />
                )}
              </div>
              <span className="text-white text-sm font-bold truncate max-w-[100px]">
                {user.username}
              </span>
              <span className={`text-white text-xs transition-transform ${showDropdown ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {/* The Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-spotify-light border border-white/10 rounded shadow-2xl z-50 py-1">
                <div className="px-4 py-3 border-b border-white/10 text-white text-sm truncate">
                  Logged in as <br/>
                  <span className="font-bold">{user.email}</span>
                </div>
                <button 
                  className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  Account Settings
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition border-t border-white/10"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Fallback if somehow they aren't logged in but bypass the protection */
          <div className="flex items-center gap-6 text-white font-bold">
            <Link to="/register" className="text-spotify-grey hover:text-white transition scale-100 hover:scale-105">
              Sign up
            </Link>
            <Link to="/login" className="bg-white text-black px-8 py-3 rounded-full hover:scale-105 transition">
              Log in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;