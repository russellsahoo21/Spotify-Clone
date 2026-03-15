import { useContext } from 'react';
import { PlayerContext } from '../../context/PlayerContext';
import { FaPlayCircle, FaPauseCircle, FaStepForward, FaStepBackward } from 'react-icons/fa';
import ProgressBar from './ProgressBar'; // <-- Import your new component

const MusicPlayer = () => {
  const { currentSong, isPlaying, togglePlay } = useContext(PlayerContext);

  if (!currentSong) {
    return (
      <div className="h-24 bg-spotify-black border-t border-spotify-light px-4 flex items-center justify-center">
        <p className="text-spotify-grey text-sm">Select a song to start listening</p>
      </div>
    );
  }

  return (
    <div className="h-24 bg-spotify-black border-t border-spotify-light px-4 flex items-center justify-between">
      
      <div className="w-1/3 flex items-center gap-4">
        <img 
          src={currentSong.coverImage} 
          alt={currentSong.title} 
          className="h-14 w-14 rounded shadow-lg object-cover"
        />
        <div>
          <h4 className="text-white text-sm font-semibold hover:underline cursor-pointer">
            {currentSong.title}
          </h4>
          <p className="text-xs text-spotify-grey hover:underline cursor-pointer">
            {currentSong.artist}
          </p>
        </div>
      </div>
      
      <div className="w-1/3 flex flex-col items-center justify-center">
        <div className="flex items-center gap-6 text-spotify-grey">
          <button className="hover:text-white transition"><FaStepBackward size={20} /></button>
          
          <button 
            onClick={togglePlay} 
            className="text-white hover:scale-105 transition"
          >
            {isPlaying ? <FaPauseCircle size={40} /> : <FaPlayCircle size={40} />}
          </button>
          
          <button className="hover:text-white transition"><FaStepForward size={20} /></button>
        </div>
        
        {/* Replace the old HTML with your new component */}
        <ProgressBar /> 
      </div>
      
      <div className="w-1/3 flex justify-end pr-4 text-spotify-grey text-sm">
        {/* We can build a volume slider here later! */}
      </div>
    </div>
  );
};

export default MusicPlayer;