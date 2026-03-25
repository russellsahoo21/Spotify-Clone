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
      {currentSong && (
        <div className={
          showVideo 
            ? isExpanded
              // 1. EXPANDED MOBILE MODE: Massive square, perfectly positioned over the cover art
              ? "fixed top-32 left-6 right-6 aspect-square bg-black z-[110] rounded-xl pointer-events-none shadow-2xl transition-all md:bottom-24 md:top-auto md:w-80 md:left-0 md:aspect-video"
              // 2. MINI MODE: Bottom left corner
              : "fixed bottom-20 md:bottom-24 left-0 w-full md:w-64 aspect-video bg-black z-[110] border-t border-white/10 pointer-events-none shadow-2xl transition-all"
            : "hidden"
        }>
          <YouTube
            videoId={getYouTubeId(currentSong.audioUrl)}
            opts={{
              width: '100%', height: '100%',
              playerVars: { autoplay: 1, controls: 0, disablekb: 1, fs: 0, modestbranding: 1 },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
            className="w-full h-full"
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
};