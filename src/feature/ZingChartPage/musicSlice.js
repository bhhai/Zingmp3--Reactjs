const { createSlice } = require("@reduxjs/toolkit");

const musicSlice = createSlice({
  name: "music",
  initialState: {
    playingPlaylist: [],
    playingSong: "",
    isPlaying: null,
  },
  reducers: {
    setPlayingSong(state, action) {
      return { ...state, playingSong: action.payload };
    },
    setPlayingPlaylist(state, action) {
      state.playingPlaylist = action.payload;
    },
    setIsPlayingSong(state, action) {
      state.isPlaying = action.payload;
    },
    setNextSong(state, action) {
      const playingPlaylist = state.playingPlaylist;
      const playingSong = state.playingSong;
      if (playingPlaylist.length > 1) {
        const currentSongIndex = playingPlaylist.findIndex(
          (song) => song.encodeId === playingSong
        );
        const nextSongIndex = currentSongIndex + 1;
        const nextSongId = playingPlaylist[nextSongIndex].encodeId;
        return {
          ...state,
          playingSong: nextSongId,
        };
      }
    },
    setPrevSong(state, action) {
      const playingPlaylist = state.playingPlaylist;
      const playingSong = state.playingSong;
      if (playingPlaylist.length > 1) {
        const currentSongIndex = playingPlaylist.findIndex(
          (song) => song.encodeId === playingSong
        );
        if (currentSongIndex === 0) {
          const prevSongId = playingPlaylist[0].encodeId;
          return {
            ...state,
            playingSong: prevSongId,
          };
        } else {
          const nextSongIndex = currentSongIndex - 1;
          const nextSongId = playingPlaylist[nextSongIndex].encodeId;
          return {
            ...state,
            playingSong: nextSongId,
          };
        }
      }
    },
  },
});

const { actions, reducer } = musicSlice;
export const {
  setPlayingSong,
  setPlayingPlaylist,
  setNextSong,
  setPrevSong,
  setUrlList,
  setIsPlayingSong,
} = actions;
export default reducer;
