import { createContext, useState, useEffect } from 'react';
import YouTube from 'react-youtube';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytPlayer, setYtPlayer] = useState(null);

  // Helper function to extract the 11-character YouTube ID from a full URL
  const getYouTubeId = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : url; // Returns the ID, or the original string if it's already just an ID
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // The YouTube component handles autoplaying when the ID changes!
  };

  const togglePlay = () => {
    if (!ytPlayer) return;

    if (isPlaying) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  // When the YouTube iframe finishes loading in the background, save its instance
  const onReady = (event) => {
    setYtPlayer(event.target);
  };

  // Keep our UI play/pause button synced with the hidden YouTube player's actual state
  const onStateChange = (event) => {
    // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
    if (event.data === 1) setIsPlaying(true);
    if (event.data === 2) setIsPlaying(false);
  };

  return (
    <PlayerContext.Provider 
      value={{ 
        currentSong, 
        isPlaying, 
        playSong, 
        togglePlay, 
        ytPlayer // Pass the player instance to the progress bar!
      }}
    >
      {children}

      {/* THE HIDDEN ENGINE */}
      {currentSong && (
        <div className="hidden">
          <YouTube
            videoId={getYouTubeId(currentSong.audioUrl)}
            opts={{
              height: '0',
              width: '0',
              playerVars: {
                autoplay: 1,      // Start playing immediately
                controls: 0,      // Hide YT controls
                disablekb: 1,     // Disable keyboard shortcuts
                fs: 0,            // Disable fullscreen
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      )}
    </PlayerContext.Provider>
  );
};