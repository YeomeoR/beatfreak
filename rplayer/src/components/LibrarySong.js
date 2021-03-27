
const LibrarySong = ({
  audioRef,
  song,
  songs,
  setCurrentSong,
  id,
  isPlaying,
  setSongs,
}) => {
  const songSelectHandler =  async () => {
    const selectedSong = songs.filter((state) => state.id === id);
    await setCurrentSong(selectedSong[0]);
    // add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);
    if (isPlaying) audioRef.current.play();
  };
  return (
    <div
      className={`library-song ${song.active && 'selected'}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt="cover" />
      <div className="song-description">
        <h4>{song.name}</h4>
        <h5>{song.artist}</h5>
      </div>
    </div>
  );
};

export default LibrarySong;
