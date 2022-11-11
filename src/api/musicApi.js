import axiosClient from "./axiosClient";

const musicApi = {
  getSong: async (id) => {
    const url = "song?id=" + id;
    return await axiosClient.get(url, id);
  },
  getPlaylist: async (id) => {
    const url = "playlist?id=" + id;
    return await axiosClient.get(url, id);
  },
  getHome: async (page) => {
    const url = "home?page=" + page;
    return await axiosClient.get(url, page);
  },
  getTop100: () => {
    const url = "top100";
    return axiosClient.get(url);
  },
  getCharthome: () => {
    const url = "charthome";
    return axiosClient.get(url);
  },
  getInfoSong: (id) => {
    const url = "infosong?id=" + id;
    return axiosClient.get(url, id);
  },
  getArtist: async (name) => {
    const url = "artist?name=" + name;
    return await axiosClient.get(url, name);
  },
  getLyric: async (id) => {
    const url = "lyric?id=" + id;
    return await axiosClient.get(url, id);
  },
  search: async (keyword) => {
    const url = "search?keyword=" + keyword;
    return await axiosClient.get(url, keyword);
  },
  getListMV: async (id, page, count) => {
    const url = "listmv?id=" + id + "&page=" + page + "&count=" + count;
    return await axiosClient.get(url, id, page, count);
  },
  getCategoryMV: async (id) => {
    const url = "categorymv?id=" + id;
    return await axiosClient.get(url, id);
  },
  getVideo: async (id) => {
    const url = "video?id=" + id;
    return await axiosClient.get(url, id);
  },
};

export default musicApi;
