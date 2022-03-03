import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Playlist.css";
import { useParams } from "react-router-dom";
import PlaylistBanner from "./PlaylistBanner/PlaylistBanner";
import PlaylistSong from "./PlaylistSong/PlaylistSong";
import { useEffect } from "react";
import musicApi from "../../api/musicApi";
import { useDispatch } from "react-redux";
import { setPlayingPlaylist } from "../ZingChartPage/musicSlice";

Playlist.propTypes = {};

function Playlist(props) {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [playlist, setPlaylist] = useState({});
  const [playlistSong, setPlaylistSOng] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const res = await musicApi.getPlaylist(id.split(".")[0]);

        setPlaylist(res.data);
        setPlaylistSOng(res.data.song.items);

        dispatch(setPlayingPlaylist(res.data.song.items));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPlaylist();
  }, [id]);

  return (
    <div className="playlist">
      <div className="playlist-container">
        <PlaylistBanner playlist={playlist && playlist} />
        <PlaylistSong data={playlistSong} playlist={playlist} />
      </div>
    </div>
  );
}

export default Playlist;
