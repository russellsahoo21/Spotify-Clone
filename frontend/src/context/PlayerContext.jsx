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

  // NEW: Auto-minimize the player if the screen is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // 768px is the 'md' breakpoint in Tailwind
        setIsExpanded(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              // 1. MOBILE EXPANDED: Better alignment and size constraint
              ? "fixed top-[120px] left-6 right-6 aspect-square max-h-[60vh] bg-black z-[110] overflow-hidden shadow-2xl pointer-events-none rounded-xl"
              // 2. PC & MINI MODE: Floating on desktop, but 'YouTube Music' style thumbnail on mobile
              : "fixed bottom-[76px] left-[12px] w-10 h-10 md:bottom-24 md:right-4 md:w-64 md:h-auto md:aspect-video bg-black z-[110] rounded-md md:rounded-xl shadow-2xl border border-white/10 overflow-hidden pointer-events-none"
            : "hidden"
        }>
          <div className="w-full h-full relative flex items-center justify-center bg-black">
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
                  disablekb: 1,          // Disable keyboard shortcuts
                  origin: window.location.origin,
                  autoplay: 1,
                  mute: 0
                }
              }}
              onReady={onReady}
              onStateChange={onStateChange}
              /* Fix for 'tearing': Ensure it fills the area but maintains ratio where possible */
              className="w-full h-full"
              containerClassName="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      )}
    </PlayerContext.Provider>
  );
};