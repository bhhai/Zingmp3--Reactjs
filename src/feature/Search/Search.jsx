import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Search.css";
import { Link, useLocation, useParams } from "react-router-dom";
import musicApi from "../../api/musicApi";
import ChartPlayList from "../ZingChartPage/ChartPlayList/ChartPlayList";
import TopicSlide from "../../components/TopicSlide/TopicSlide";
import Mv from "../../components/MV/Mv";
import PlaylistArtistSlide from "../Playlist/PlaylistArtistSlide/PlaylistArtistSlide";

Search.propTypes = {};

function Search(props) {
  const { name } = useParams();

  const [top, setTop] = useState(null);
  const [songs, setSongs] = useState([]);
  const [playList, setPlaylist] = useState([]);
  const [video, setVideo] = useState([]);
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data } = await musicApi.search(name);

      setTop(data.top);
      setSongs(data.songs);
      setPlaylist(data.playlists);
      setVideo(data.videos);
      setArtist(data.artists);

      setLoading(false);
    };

    getData();
  }, [name]);

  return (
    <div className="search">
      <div className="search__container">
        {top && (
          <div className="search__top">
            <h2>
              Top Kết Quả <i>"{name}"</i>
            </h2>
            <Link to={top.link} className="search__top-item">
              <div className="search__thumb">
                <img src={top.thumbnail} alt="" />
              </div>
              <div className="search__name">
                <p>{top.name || top.title}</p>
                <span>
                  {top.objectType === "artist" ? "Nghệ sĩ" : "Bài hát"}
                </span>
              </div>
            </Link>
          </div>
        )}

        {songs && (
          <div className="search__song">
            <h4>Bài Hát</h4>
            <ChartPlayList data={songs} iconNone="true" loading={loading} />
          </div>
        )}

        {playList && (
          <div className="search__song">
            <h4 style={{ marginBottom: 15 }}>Playlist/Album</h4>
            <TopicSlide data={playList} loading={loading} />
          </div>
        )}

        {video && (
          <div className="search__song">
            <h4 style={{ marginBottom: 15 }}>MV</h4>
            <Mv data={video} loading={loading} />
          </div>
        )}

        {artist && (
          <div className="search__song">
            <h4 style={{ marginBottom: 15 }}>Nghệ Sĩ/OA</h4>
            <PlaylistArtistSlide data={artist} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
