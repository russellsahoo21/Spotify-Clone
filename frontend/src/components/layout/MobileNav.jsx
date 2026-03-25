import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiSearch, FiBook, FiPlusSquare } from 'react-icons/fi';

const MobileNav = () => {
  const location = useLocation();

  // Our 4 main navigation points
  const navItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/search', icon: FiSearch, label: 'Search' },
    { path: '/library', icon: FiBook, label: 'Library' },
    { path: '/add-song', icon: FiPlusSquare, label: 'Add' },
  ];

  return (
    // Visible only on mobile (md:hidden), flexbox evenly spaces the icons
    <div className="md:hidden flex items-center justify-around bg-black border-t border-white/10 h-16 shrink-0 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        // Check if the current URL matches the button so we can highlight it white!
        const isActive = location.pathname === item.path; 
        
        return (
          <Link 
            key={item.label} 
            to={item.path} 
            className={`flex flex-col items-center gap-1.5 ${isActive ? 'text-white' : 'text-spotify-grey hover:text-white'} transition p-2`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNav;