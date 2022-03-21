import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Playlist.css";
import { useParams } from "react-router-dom";
import PlaylistBanner from "./PlaylistBanner/PlaylistBanner";
import PlaylistSong from "./PlaylistSong/PlaylistSong";
import { useEffect } from "react";
import musicApi from "../../api/musicApi";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingPlaylist } from "../ZingChartPage/musicSlice";
import PlaylistArtistSlide from "./PlaylistArtistSlide/PlaylistArtistSlide";

Playlist.propTypes = {};

function Playlist(props) {
  const { id } = useParams();

  const isPlayingSong = useSelector((state) => state.music.isPlaying);

  const dispatch = useDispatch();

  const [playlist, setPlaylist] = useState({});
  const [playlistSong, setPlaylistSOng] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const res = await musicApi.getPlaylist(id.split(".")[0]);

        setPlaylist(res.data);
        setPlaylistSOng(res.data.song.items);
        setArtists(res.data?.artists);

        dispatch(setPlayingPlaylist(res.data.song.items));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getPlaylist();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="playlist">
      <div className="playlist-container">
        <PlaylistBanner
          playing={isPlayingSong}
          playlist={playlist && playlist}
          loading={loading}
        />
        <PlaylistSong
          data={playlistSong}
          playlist={playlist}
          loading={loading}
        />
      </div>

      <div className="playlist__artist-slide">
        <h2 className="playlist__artist-title">Nghệ sĩ tham gia</h2>
        <PlaylistArtistSlide data={artists} />
      </div>
    </div>
  );
}

export default Playlist;
