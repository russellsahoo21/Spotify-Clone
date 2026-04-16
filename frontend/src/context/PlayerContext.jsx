import { createContext, useState, useEffect } from 'react';
import YouTube from 'react-youtube';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytPlayer, setYtPlayer] = useState(null);
  const [volume, setVolume] = useState(100);
  const [showVideo, setShowVideo] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [lyrics, setLyrics] = useState("");

  // --- REGEX CLEANING LOGIC ---
const sanitizeTitle = (title, artist) => {
  if (!title) return "";

  let cleaned = title
    // 1. Remove the artist name from the title if it exists (e.g., "Ed Sheeran - ")
    .replace(new RegExp(`^${artist}\\s*-\\s*`, 'gi'), '') 
    .replace(new RegExp(`^${artist}\\s*`, 'gi'), '')
    
    // 2. Remove YouTube "Noise"
    .replace(/\(Official Video\)/gi, '')
    .replace(/\(Official Music Video\)/gi, '')
    .replace(/\(Video\)/gi, '')
    .replace(/\(Audio\)/gi, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/ft\..*|feat\..*/gi, '')
    .replace(/\|.*/g, '')
    .trim();

  return cleaned;
};

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!currentSong) return;
      
      setLyrics("Searching for lyrics...");

      const cleanArtist = currentSong.artist.split(' - ')[0].trim();
      const cleanTitle = sanitizeTitle(currentSong.title, cleanArtist);

      console.log(`Fetching lyrics for: Artist="${cleanArtist}", Title="${cleanTitle}"`);

      try {
        const response = await fetch(
          `https://api.lyrics.ovh/v1/${encodeURIComponent(cleanArtist)}/${encodeURIComponent(cleanTitle)}`
        );
        const data = await response.json();
        
        setLyrics(data.lyrics || "Lyrics not found for this track.");
      } catch (error) {
        setLyrics("Unable to load lyrics at this time.");
      }
    };

    fetchLyrics();
  }, [currentSong]);

  // Handle Resize for Mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsExpanded(false);
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
        isExpanded, setIsExpanded, lyrics // CRITICAL: Added lyrics here
      }}
    >
      {children}

    </PlayerContext.Provider>
  );
};