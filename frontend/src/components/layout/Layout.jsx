import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MusicPlayer from '../player/MusicPlayer';
import MobileNav from './MobileNav'; 

const Layout = () => {
  return (
    // 1. CRITICAL FIX: Changed h-screen to h-[100dvh]
    // This tells the browser to dynamically adjust to the *actual* visible screen space
    <div className="h-[100dvh] w-full bg-black flex flex-col overflow-hidden font-sans text-white">
      
      {/* TOP SECTION: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col bg-spotify-dark overflow-y-auto relative bg-gradient-to-b from-white/10 to-spotify-dark">
          <Navbar />
          <main className="p-4 md:p-8 flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {/* 2. SWAPPED ORDER: Music Player is now ABOVE the Mobile Nav */}
      <div className="shrink-0 z-50 h-16 md:h-24 bg-black border-t border-white/10">
        <MusicPlayer />
      </div>

      {/* 3. SWAPPED ORDER: Mobile Nav is now at the absolute bottom */}
      <MobileNav />
      
    </div>
  );
};

export default Layout;