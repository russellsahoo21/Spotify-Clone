import { createContext, useState, useEffect } from 'react';
import YouTube from 'react-youtube';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytPlayer, setYtPlayer] = useState(null);
  const [volume, setVolume] = useState(100);
  const [showVideo, setShowVideo] = useState(false);
  
  // NEW: Track if the mobile player is full-screen!
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentMode, setCurrentMode] = useState('song'); // 'song' or 'video'


  const minimizePlayer = () => {
  setIsExpanded(false);
};

  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : url;
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!ytPlayer) return;
    if (isPlaying) ytPlayer.pauseVideo();
    else ytPlayer.playVideo();
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (ytPlayer) ytPlayer.setVolume(newVolume);
  };

  const onReady = (event) => {
    setYtPlayer(event.target);
    event.target.setVolume(volume);
  };

  const onStateChange = (event) => {
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2) setIsPlaying(false);
    if (event.data === 0) {
      event.target.seekTo(0);
      event.target.playVideo();
    }
  };

  return (
    <PlayerContext.Provider 
      value={{ 
        currentSong, isPlaying, playSong, togglePlay, ytPlayer,
        volume, changeVolume, showVideo, setShowVideo,
        isExpanded, setIsExpanded // Pass down the new states!
      }}
    >
      {children}

      {/* THE UPGRADED VIDEO ENGINE */}
      {/* Inside PlayerContext.jsx */}

{currentSong && (
  <div className={
    showVideo 
      ? isExpanded
        // 1. MOBILE EXPANDED: Zero padding, covers the container exactly
        ? "fixed top-32 left-6 right-6 aspect-square bg-black z-[110] overflow-hidden shadow-2xl pointer-events-none"
        // 2. PC & MINI MODE: No padding, clean edges
        : "fixed bottom-24 w-64 aspect-video md:bottom-24 md:w-64 bg-black z-[110] shadow-2xl border border-white/10 overflow-hidden pointer-events-none"
      : "hidden"
  }>
    <div className="w-full h-full relative">
       <YouTube
        videoId={getYouTubeId(currentSong.audioUrl)}
        opts={{ 
          width: '100%', 
          height: '100%', 
          playerVars: { 
            autoplay: 1, 
            controls: 0,           // Hides all YT play/pause bars
            modestbranding: 1,     // Removes the big YT logo
            rel: 0,                // No related videos at the end
            showinfo: 0,           // Hide video title/uploader
            iv_load_policy: 3,     // Hide annotations
            disablekb: 1           // Disable keyboard shortcuts
          } 
        }}
        onReady={onReady}
        onStateChange={onStateChange}
        /* CSS to ensure NO padding/extra space inside the iframe */
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  </div>
)}
    </PlayerContext.Provider>
  );
};