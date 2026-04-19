import { useContext, useState, useEffect } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import ProgressBar from './ProgressBar';
import YouTube from 'react-youtube';

// --- ICONS ---
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import { FiMonitor, FiVolume2, FiVolumeX, FiChevronDown, FiShuffle, FiRepeat, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import { MdThumbUpOffAlt, MdThumbDownOffAlt, MdPlaylistAdd, MdShare } from 'react-icons/md';

const MusicPlayer = () => {
  // New state to handle lyrics expansion
  const [isLyricsFull, setIsLyricsFull] = useState(false);

  const {
    currentSong, isPlaying, togglePlay, volume, changeVolume,
    showVideo, setShowVideo, isExpanded, setIsExpanded,
    lyrics, ytPlayer, onReady, onStateChange
  } = useContext(PlayerContext);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : url;
  };

  if (!currentSong) return null;

  return (
    <>
      {/* 🌟 FULL SCREEN MOBILE OVERLAY 🌟 */}
      {/* We keep this always mounted but hidden to prevent the YouTube player from unmounting/reloading */}
      {/* 🌟 FULL SCREEN MOBILE OVERLAY 🌟 */}
      {/* This container stays mounted to keep the player alive, but is invisible on desktop or when minimized. */}
      <div className={`fixed inset-0 z-[100] overflow-y-auto custom-scrollbar scroll-smooth transition-all duration-500 ease-in-out
        ${isExpanded ? 'bg-black pointer-events-auto' : 'bg-transparent pointer-events-none'}
      `}>
          {/* THE ACTUAL OVERLAY CONTENT (Only shows on mobile when expanded) */}
          <div className={`p-6 pt-12 flex flex-col min-h-full transition-opacity duration-500 md:hidden
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            {/* 1. TOP HEADER */}
            <div className="flex justify-between items-center mb-8 h-10 shrink-0">
              <button onClick={() => setIsExpanded(false)} className="p-2 -ml-2">
                <FiChevronDown size={32} className="text-white hover:opacity-75 transition" />
              </button>

              <div className="flex bg-white/10 rounded-full p-1">
                <button
                  onClick={() => setShowVideo(false)}
                  className={`px-6 py-1.5 rounded-full text-xs font-bold transition ${!showVideo ? 'bg-white/20 text-white' : 'text-zinc-500'}`}
                >Song</button>
                <button
                  onClick={() => setShowVideo(true)}
                  className={`px-6 py-1.5 rounded-full text-xs font-bold transition ${showVideo ? 'bg-white/20 text-white' : 'text-zinc-500'}`}
                >Video</button>
              </div>
              <div className="w-10" />
            </div>

            {/* 2. MAIN DISPLAY (Art or Video Placeholder) */}
            <div className="w-full aspect-square mb-8 relative shrink-0">
              {!showVideo ? (
                <div className="w-full h-full bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                  <img src={currentSong.coverImage} className="w-full h-full object-cover" alt="Art" />
                </div>
              ) : (
                <div className="w-full h-full bg-black rounded-xl overflow-hidden relative">
                   {/* The Persistent Player is rendered as a child of the overlay, positioned absolutely here. */}
                </div>
              )}
            </div>

            {/* 3. INFO & CONTROLS SECTION */}
            <div className="flex flex-col shrink-0">
              <div className="mb-4">
                <h2 className="text-2xl font-extrabold text-white truncate mb-1">{currentSong.title}</h2>
                <p className="text-spotify-grey text-base truncate">{currentSong.artist}</p>
              </div>

              <div className="flex items-center justify-between mb-6 text-white/80">
                <button className="flex items-center gap-2 hover:text-white bg-white/10 px-4 py-2 rounded-full text-xs font-semibold transition active:scale-95">
                  <MdThumbUpOffAlt size={18} /> Like
                </button>
                <button className="hover:text-white bg-white/10 p-2 rounded-full transition active:scale-95">
                  <MdThumbDownOffAlt size={18} />
                </button>
                <button className="flex items-center gap-2 hover:text-white bg-white/10 px-4 py-2 rounded-full text-xs font-semibold transition active:scale-95">
                  <MdPlaylistAdd size={18} /> Save
                </button>
                <button className="hover:text-white bg-white/10 p-2 rounded-full transition active:scale-95">
                  <MdShare size={18} />
                </button>
              </div>

              <div className="mb-6"><ProgressBar /></div>

              <div className="flex items-center justify-between px-2 mb-10">
                <FiShuffle size={22} className="text-spotify-grey hover:text-white transition" />
                <div className="flex items-center gap-6">
                  <FaStepBackward size={28} className="text-white hover:opacity-75 transition" />
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg active:scale-95"
                  >
                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="pl-1" />}
                  </button>
                  <FaStepForward size={28} className="text-white hover:opacity-75 transition" />
                </div>
                <FiRepeat size={22} className="text-spotify-grey hover:text-white transition" />
              </div>
            </div>

            {/* 4. THE SPOTIFY LYRICS CARD */}
            <div className={`w-full bg-[#6d4c41] rounded-2xl p-6 transition-all duration-500 ease-in-out flex flex-col shadow-xl 
              ${isLyricsFull 
                ? "fixed inset-0 z-[120] rounded-none pt-20 pb-10" 
                : "relative mb-12 min-h-[400px] max-h-[450px]"
              }`}
            >
              <div className="flex justify-between items-center mb-6 shrink-0">
                <span className="text-white font-bold text-xl tracking-tight">Lyrics</span>
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLyricsFull(!isLyricsFull);
                  }}
                  className="bg-black/20 p-2 rounded-full text-white hover:bg-black/40 transition active:scale-90"
                >
                  {isLyricsFull ? <FiMinimize2 size={20} /> : <FiMaximize2 size={20} />}
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                <p className={`font-bold text-white leading-tight whitespace-pre-line tracking-tight transition-all duration-300
                  ${isLyricsFull ? "text-3xl opacity-100" : "text-xl opacity-90"}
                `}>
                  {lyrics || "No lyrics found for this track."}
                </p>

                <div className="mt-10 pt-4 text-white/30 text-[10px] font-bold uppercase tracking-widest border-t border-white/10">
                  Source: Lyrics.ovh
                </div>
              </div>
            </div>
          </div>

          {/* 🌟 PERSISTENT SINGLE PLAYER 🌟 */}
          <div 
            className={`z-[110] bg-black overflow-hidden
              ${!showVideo ? 'opacity-0 invisible' : 'opacity-100 visible'}
              ${isExpanded 
                ? 'absolute top-[120px] left-12 right-12 aspect-square rounded-xl shadow-2xl pointer-events-none' 
                : 'fixed bottom-[76px] w-10 h-10 md:bottom-24 md:w-64 md:h-auto md:aspect-video border border-white/10 rounded-md shadow-lg pointer-events-none'
              }
            `}
          >
            <YouTube
              videoId={getYouTubeId(currentSong.audioUrl)}
              opts={{
                width: '100%',
                height: '100%',
                playerVars: {
                  autoplay: 1,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  iv_load_policy: 3,
                  disablekb: 1,
                  origin: window.location.origin,
                }
              }}
              onReady={onReady}
              onStateChange={onStateChange}
              className="w-full h-full"
              containerClassName="absolute inset-0 w-full h-full"
            />
          </div>
      </div>

      {/* 🌟 STANDARD MINI PLAYER 🌟 */}
      <div className="h-full px-2 md:px-4 flex items-center justify-between relative z-50">
        <div
          onClick={() => { if (window.innerWidth < 768) setIsExpanded(true); }}
          className="flex items-center gap-2 md:gap-4 w-1/2 md:w-1/3 pr-2 overflow-hidden cursor-pointer hover:bg-white/5 rounded transition p-1"
        >
          <img
            src={currentSong.coverImage}
            alt="Cover"
            className={`w-10 h-10 md:w-14 md:h-14 object-cover rounded-md shadow-md shrink-0 transition-opacity ${showVideo ? 'max-md:opacity-0' : 'opacity-100'}`}
          />
          <div className="overflow-hidden">
            <h4 className="text-white text-xs md:text-sm font-bold truncate">{currentSong.title}</h4>
            <p className="text-spotify-grey text-[10px] md:text-xs truncate mt-1">{currentSong.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-end md:items-center justify-center w-1/2 md:w-1/3 max-w-md pr-2 md:pr-0">
          <div className="flex items-center gap-4 md:gap-6 text-spotify-grey">
            <FaStepBackward size={16} className="hover:text-white transition cursor-pointer hidden md:block" />
            <button
              onClick={(e) => { e.stopPropagation(); togglePlay(); }}
              className="bg-white text-black w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center hover:scale-105 transition shrink-0 active:scale-95"
            >
              {isPlaying ? <FaPause size={12} className="md:w-4 md:h-4" /> : <FaPlay size={12} className="pl-1 md:w-4 md:h-4" />}
            </button>
            <FaStepForward size={16} className="hover:text-white transition cursor-pointer hidden md:block" />
          </div>
          <div className="hidden md:block w-full mt-2"><ProgressBar /></div>
        </div>

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