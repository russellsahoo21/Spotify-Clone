import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import ProgressBar from './ProgressBar';

// --- ALL OUR ICONS FROM REACT-ICONS ---
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { FiMonitor, FiVolume2, FiVolumeX, FiChevronDown, FiShuffle, FiRepeat } from 'react-icons/fi';
import { MdThumbUpOffAlt, MdThumbDownOffAlt, MdPlaylistAdd, MdShare } from 'react-icons/md';

const MusicPlayer = () => {
  const { 
    currentSong, isPlaying, togglePlay, volume, changeVolume, 
    showVideo, setShowVideo, isExpanded, setIsExpanded 
  } = useContext(PlayerContext);

  if (!currentSong) return null;

  return (
    <>
      {/* 🌟 FULL SCREEN MOBILE OVERLAY (YouTube Music Style) 🌟 */}
      {isExpanded && (
        // CHANGED: bg-spotify-black to bg-black for that deep OLED dark mode look!
        <div className="fixed inset-0 bg-black z-[100] flex flex-col p-6 pt-12 md:hidden">
          
          {/* Top Header: Close Button & Song/Video Toggle */}
          <div className="flex justify-between items-center mb-8 h-10">
            <button onClick={() => setIsExpanded(false)} className="p-2 -ml-2">
              <FiChevronDown size={32} className="text-white hover:opacity-75 transition" />
            </button>

            {/* The Iconic Pill Toggle */}
            <div className="flex bg-white/10 rounded-full p-1">
              <button 
                onClick={() => setShowVideo(false)} 
                className={`px-6 py-1.5 rounded-full text-xs font-bold transition ${!showVideo ? 'bg-white/20 text-white shadow-md' : 'text-spotify-grey'}`}
              >
                Song
              </button>
              <button 
                onClick={() => setShowVideo(true)} 
                className={`px-6 py-1.5 rounded-full text-xs font-bold transition ${showVideo ? 'bg-white/20 text-white shadow-md' : 'text-spotify-grey'}`}
              >
                Video
              </button>
            </div>
            
            <div className="w-10" /> {/* Invisible spacer for flexbox centering */}
          </div>

          {/* Center: The Massive Cover Art Space */}
          {/* (If showVideo is true, the global YouTube iframe magically floats perfectly over this box!) */}
          <div className="w-full aspect-square bg-spotify-dark rounded-xl shadow-2xl overflow-hidden mb-6 shrink-0 flex items-center justify-center">
            {!showVideo && <img src={currentSong.coverImage} alt="Cover Art" className="w-full h-full object-cover" />}
          </div>

          {/* Bottom Area: Song Info, Action Buttons, and Controls */}
          <div className="flex flex-col flex-1 justify-end pb-8">
            
            {/* Title & Artist */}
            <div className="mb-4">
              <h2 className="text-2xl font-extrabold text-white truncate mb-1">{currentSong.title}</h2>
              <p className="text-spotify-grey text-base truncate">{currentSong.artist}</p>
            </div>

            {/* Secondary Action Buttons (Like, Dislike, Save, Share) */}
            <div className="flex items-center justify-between mb-6 text-white/80">
              <button className="flex items-center gap-2 hover:text-white bg-white/10 px-4 py-2 rounded-full text-xs font-semibold transition">
                <MdThumbUpOffAlt size={18} /> Like
              </button>
              <button className="hover:text-white bg-white/10 p-2 rounded-full transition">
                <MdThumbDownOffAlt size={18} />
              </button>
              <button className="flex items-center gap-2 hover:text-white bg-white/10 px-4 py-2 rounded-full text-xs font-semibold transition">
                <MdPlaylistAdd size={18} /> Save
              </button>
              <button className="hover:text-white bg-white/10 p-2 rounded-full transition">
                <MdShare size={18} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <ProgressBar />
            </div>

            {/* Primary Playback Controls */}
            <div className="flex items-center justify-between px-2">
              <FiShuffle size={22} className="text-spotify-grey hover:text-white transition cursor-pointer" />
              
              <div className="flex items-center gap-6">
                <FaStepBackward size={28} className="text-white hover:opacity-75 transition cursor-pointer" />
                <button 
                  onClick={togglePlay} 
                  className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg"
                >
                  {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="pl-1" />}
                </button>
                <FaStepForward size={28} className="text-white hover:opacity-75 transition cursor-pointer" />
              </div>

              <FiRepeat size={22} className="text-spotify-grey hover:text-white transition cursor-pointer" />
            </div>

          </div>
        </div>
      )}

      {/* 🌟 STANDARD MINI PLAYER (Bottom of screen) 🌟 */}
      <div className="h-full px-2 md:px-4 flex items-center justify-between relative z-50">
        
        {/* Left: Mini Cover Art (Click to expand!) */}
        <div 
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2 md:gap-4 w-1/2 md:w-1/3 pr-2 overflow-hidden cursor-pointer hover:bg-white/5 rounded transition p-1"
        >
          <img src={currentSong.coverImage} alt="Cover" className="w-10 h-10 md:w-14 md:h-14 object-cover rounded-md shadow-md shrink-0" />
          <div className="overflow-hidden">
            <h4 className="text-white text-xs md:text-sm font-bold truncate">{currentSong.title}</h4>
            <p className="text-spotify-grey text-[10px] md:text-xs truncate mt-1">{currentSong.artist}</p>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex flex-col items-end md:items-center justify-center w-1/2 md:w-1/3 max-w-md pr-2 md:pr-0">
          <div className="flex items-center gap-4 md:gap-6 text-spotify-grey">
            <FaStepBackward size={16} className="hover:text-white transition cursor-pointer hidden md:block" />
            
            <button 
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="bg-white text-black w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:scale-105 transition shrink-0"
            >
              {isPlaying ? <FaPause size={12} className="md:w-4 md:h-4" /> : <FaPlay size={12} className="pl-1 md:w-4 md:h-4" />}
            </button>
            
            <FaStepForward size={16} className="hover:text-white transition cursor-pointer hidden md:block" />
          </div>
          <div className="hidden md:block w-full mt-2"><ProgressBar /></div>
        </div>

        {/* Right: Desktop Controls (Volume, Video Toggle) */}
        <div className="hidden md:flex items-center gap-4 w-1/3 justify-end pr-4">
          <button onClick={() => setShowVideo(!showVideo)} className={`transition ${showVideo ? 'text-spotify-green' : 'text-spotify-grey hover:text-white'}`} title="Toggle Video">
            <FiMonitor size={20} />
          </button>
          <button onClick={() => changeVolume(volume === 0 ? 100 : 0)} className="text-spotify-grey hover:text-white transition">
            {volume === 0 ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
          </button>
          <input type="range" min="0" max="100" value={volume} onChange={(e) => changeVolume(Number(e.target.value))} style={{ background: `linear-gradient(to right, white ${volume}%, #404040 ${volume}%)` }} className="w-24 h-1 appearance-none cursor-pointer rounded-full transition-all outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full" />
        </div>

      </div>
    </>
  );
};

export default MusicPlayer;