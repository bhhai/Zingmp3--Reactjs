const { createSlice } = require("@reduxjs/toolkit");

const musicSlice = createSlice({
  name: "music",
  initialState: {
    playingPlaylist: [],
    playingSong: [],
    songIndex: 0,
  },
  reducers: {
    setPlayingSong(state, action) {
      const songIndex = state.playingPlaylist.findIndex(
        (song) => song.encodeId === action.payload
      );
      return { ...state, playingSong: action.payload };
    },
    setPlayingPlaylist(state, action) {
      state.playingPlaylist = action.payload;
    },
    setNextSong(state, action) {
      const list = state.playingPlaylist;
      return {
        ...state,
        playingSong: list[action.payload].encodeId,
      };
    },
    setPrevSong(state, action) {
      return state;
    },
  },
});

const { actions, reducer } = musicSlice;
export const { setPlayingSong, setPlayingPlaylist, setNextSong, setPrevSong } =
  actions;
export default reducer;
