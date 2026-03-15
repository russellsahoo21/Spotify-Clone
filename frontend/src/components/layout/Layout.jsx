import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MusicPlayer from '../player/MusicPlayer'; // <-- Using your exact import!

const Layout = () => {
  return (
    // 1. The outermost container: Full screen, prevents full-page scrolling, stacks vertically
    <div className="h-screen w-full bg-black flex flex-col overflow-hidden font-sans text-white">
      
      {/* 2. Top Section: Flex container that takes up all space above the player */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Navigation Sidebar */}
        <Sidebar />
        
        {/* Right Main Content Area: Scrollable (overflow-y-auto) */}
        <div className="flex-1 flex flex-col bg-spotify-dark overflow-y-auto relative bg-gradient-to-b from-white/10 to-spotify-dark">
          
          {/* Top Navbar */}
          <Navbar />
          
          {/* The specific pages (Home, Search, etc.) will inject themselves here */}
          <main className="p-8 flex-1">
            <Outlet />
          </main>
          
        </div>
      </div>

      {/* 3. Bottom Section: Fixed Music Player */}
      {/* shrink-0 ensures this container never gets crushed by the top section */}
      <div className="shrink-0 z-50">
        <MusicPlayer />
      </div>
      
    </div>
  );
};

export default Layout;