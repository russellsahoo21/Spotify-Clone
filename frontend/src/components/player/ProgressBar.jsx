import { useState, useEffect, useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { formatTime } from '../../utils/formatTime';

const ProgressBar = () => {
  const { ytPlayer, isPlaying } = useContext(PlayerContext);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying && ytPlayer) {
      interval = setInterval(() => {
        setCurrentTime(ytPlayer.getCurrentTime() || 0);
        setDuration(ytPlayer.getDuration() || 0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, ytPlayer]);

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (ytPlayer) {
      ytPlayer.seekTo(newTime, true);
    }
  };

  // Calculate the percentage completed for our dynamic background
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full max-w-md flex items-center gap-2 text-xs text-spotify-grey mt-2">
      <span className="w-10 text-right">{formatTime(currentTime)}</span>
      
      {/* The Upgraded Slider */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        style={{
          // This creates the filled progress effect (White on the left, Grey on the right)
          background: `linear-gradient(to right, white ${progressPercent}%, #404040 ${progressPercent}%)`
        }}
        // The weird Webkit classes fix the thumb (the dot) so it looks like Spotify
        className="w-full h-1 appearance-none cursor-pointer rounded-full transition-all duration-150 outline-none hover:!bg-[linear-gradient(to_right,#1DB954_var(--progress),#404040_var(--progress))] 
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-spotify-green"
      />
      
      <span className="w-10 text-left">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;