import LibrarySong from './LibrarySong';

const Library = ({ isPlaying, audioRef, songs, setCurrentSong, setSongs, showLibrary }) => {
  return (
    <div className={`library ${showLibrary && 'active-library'}`} >
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
            <LibrarySong song={song} songs={songs} setCurrentSong={setCurrentSong}
          id={song.id} key={song.id} audioRef={audioRef} setSongs={setSongs}  isPlaying={isPlaying} />
        ))}
      </div>
    </div>
  );
};

export default Library;
