import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import ProgressBar from './ProgressBar';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { FiMonitor, FiVolume2, FiVolumeX, FiChevronDown, FiShuffle, FiRepeat } from 'react-icons/fi';
import { MdThumbUpOffAlt, MdThumbDownOffAlt, MdPlaylistAdd, MdShare } from 'react-icons/md';

const MusicPlayer = () => {
  const { 
    currentSong, isPlaying, togglePlay, 
    isExpanded, setIsExpanded, 
    showVideo, setShowVideo, 
    volume, changeVolume
  } = useContext(PlayerContext);

  if (!currentSong) return null;

  return (
    <>
      {/* 🌟 EXPANDED OVERLAY: Only blocks screen if isExpanded is TRUE 🌟 */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col p-6 pt-12 md:hidden animate-in slide-in-from-bottom duration-300">
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => setIsExpanded(false)} className="p-2">
              <FiChevronDown size={32} className="text-white" />
            </button>
            <div className="flex bg-white/10 rounded-full p-1">
              <button onClick={() => setShowVideo(false)} className={`px-6 py-1.5 rounded-full text-xs font-bold ${!showVideo ? 'bg-white/20 text-white' : 'text-zinc-500'}`}>Song</button>
              <button onClick={() => setShowVideo(true)} className={`px-6 py-1.5 rounded-full text-xs font-bold ${showVideo ? 'bg-white/20 text-white' : 'text-zinc-500'}`}>Video</button>
            </div>
            <div className="w-10" />
          </div>

          {/* This box is the target for the YouTube Frame when Expanded */}
          <div className="w-full aspect-square bg-zinc-900 rounded-xl overflow-hidden mb-6 shadow-2xl">
            {!showVideo && <img src={currentSong.coverImage} className="w-full h-full object-cover" />}
          </div>

          <div className="flex flex-col flex-1 justify-end pb-12">
            <h2 className="text-2xl font-bold text-white truncate mb-1">{currentSong.title}</h2>
            <p className="text-zinc-400 text-lg mb-8">{currentSong.artist}</p>
            <ProgressBar />
            <div className="flex justify-between items-center mt-8">
              <FiShuffle size={22} className="text-zinc-500" />
              <div className="flex items-center gap-8">
                <FaStepBackward size={28} />
                <button onClick={togglePlay} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center">
                  {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="pl-1" />}
                </button>
                <FaStepForward size={28} />
              </div>
              <FiRepeat size={22} className="text-zinc-500" />
            </div>
          </div>
        </div>
      )}

      {/* 🌟 MINI PLAYER: The bottom bar 🌟 */}
      <div className="h-full flex items-center justify-between px-4 relative z-[60]">
        {/* Inside MusicPlayer.jsx - Mini Player Left Section */}
<div 
  onClick={() => { if(window.innerWidth < 768) setIsExpanded(true) }} 
  className="flex items-center gap-3 w-2/3 md:w-1/3 cursor-pointer group"
>
  <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded shadow-lg overflow-hidden flex-shrink-0 border border-white/5 relative">
    {/* Desktop: Always show cover image */}
    <img 
      src={currentSong.coverImage} 
      className="w-full h-full object-cover" 
    />
  </div>

  <div className="truncate">
    <h4 className="text-white text-sm font-bold truncate">{currentSong.title}</h4>
    <p className="text-[10px] md:text-xs text-zinc-400 truncate">{currentSong.artist}</p>
  </div>
</div>

        {/* Center: Desktop Controls */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/3">
          <div className="flex items-center gap-6 text-zinc-400 mb-1">
            <FaStepBackward size={16} className="hover:text-white transition" />
            <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="bg-white text-black p-2.5 rounded-full hover:scale-105 transition shadow-md">
              {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="pl-0.5" />}
            </button>
            <FaStepForward size={16} className="hover:text-white transition" />
          </div>
          <div className="w-full max-w-md"><ProgressBar /></div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 justify-end w-1/3">
          <button onClick={(e) => { e.stopPropagation(); togglePlay(); }} className="md:hidden text-white p-2">
             {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </button>
          <div className="hidden md:flex items-center gap-4">
             <FiMonitor size={18} className={`cursor-pointer transition ${showVideo ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`} onClick={(e) => { e.stopPropagation(); setShowVideo(!showVideo); }} />
             <div className="flex items-center gap-2">
               <FiVolume2 size={18} className="text-zinc-400" />
               <input type="range" className="w-20 h-1 accent-white" />
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;