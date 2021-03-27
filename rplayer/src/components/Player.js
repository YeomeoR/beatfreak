//useEffect


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
 
  // event handlers
  const activeLibraryHandler = (nextPrev) => {
   const newSongs = songs.map((song) => {
    if (song.id === nextPrev.id) {
      return { ...song, active: true };
    } else {
      return { ...song, active: false };
    }
  });
  setSongs(newSongs);
}


  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
    // console.log(audioRef)
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === 'skip-forward') {
      await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex + 1) % songs.length])
    }
    if (direction === 'skip-back') {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
        activeLibraryHandler(songs[songs.length - 1])
        if (isPlaying) audioRef.current.play();
        return;
      }
      await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
      activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
    }
    if (isPlaying) audioRef.current.play();
  };

  // add the styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.remaining ? getTime(songInfo.remaining) : '0:00'}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="back"
          icon={faAngleLeft}
          onClick={() => skipTrackHandler('skip-back')}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="forward"
          icon={faAngleRight}
          onClick={() => skipTrackHandler('skip-forward')}
        />
      </div>
    </div>
  );
};

export default Player;
