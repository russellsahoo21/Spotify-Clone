import { useState, useRef, useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiChevronDown, FiExternalLink } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MusicPlayer from '../player/MusicPlayer';
import MobileNav from './MobileNav'; 
import Topbar from '../misc/Topbar';
import { PlayerContext } from '../../context/PlayerContext';

const Layout = () => {
  const navigate = useNavigate();
  const { isExpanded } = useContext(PlayerContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- DYNAMIC USER LOGIC ---
  // Pull the user object from localStorage (set during login)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { name: 'User' };
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col overflow-hidden text-white font-sans">
      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden md:flex w-64 shrink-0 bg-black border-r border-white/5">
          <Sidebar />
        </aside>
        
        <div className="flex-1 flex flex-col bg-spotify-dark relative overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#121212] to-spotify-dark">
            
            <Topbar /> 

            {/* NAVIGATION & PROFILE ROW */}
            <div className="md:hidden flex items-center justify-between px-4 py-2 relative">
              <div className="flex items-center gap-3">
                <button onClick={() => navigate(-1)} className="w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white active:scale-95 transition">
                  <FiChevronLeft size={22} />
                </button>
                <button onClick={() => navigate(1)} className="w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white active:scale-95 transition">
                  <FiChevronRight size={22} />
                </button>
              </div>

              {/* DYNAMIC PROFILE TAG */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/20 px-2 py-1 rounded-full transition-all duration-200"
                >
                  <div className="w-6 h-6 bg-[#f57c00] rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm shrink-0 uppercase">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  
                  <span className="text-xs font-semibold text-white/90 pr-1 tracking-tight">
                    {user?.name || "User"}
                  </span>
                  
                  <FiChevronDown size={14} className={`text-white/60 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* LOGOUT DROPDOWN */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#282828] shadow-2xl rounded-md p-1.5 z-[100] border border-white/5 animate-in fade-in zoom-in-95 duration-150">
                    <button className="w-full text-left px-3 py-2 text-[13px] font-medium text-white/90 hover:bg-white/10 flex items-center justify-between rounded-sm transition">
                      Account <FiExternalLink size={14} className="text-white/40" />
                    </button>
                    <button className="w-full text-left px-3 py-2 text-[13px] font-medium text-white/90 hover:bg-white/10 rounded-sm transition">
                      Profile
                    </button>
                    <hr className="my-1 border-white/5" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-[13px] font-bold text-white hover:bg-white/10 rounded-sm transition"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="hidden md:block">
              <Navbar />
            </div>

            <main className="p-4 md:p-8 flex-1 pb-40">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <div className="shrink-0 z-50 h-20 md:h-24 bg-black border-t border-white/10">
        <MusicPlayer />
      </div>
      <MobileNav />
    </div>
  );
};

export default Layout;