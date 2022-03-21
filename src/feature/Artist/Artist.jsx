import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Artist.css";
import ArtistHero from "./ArtistHero/ArtistHero";
import musicApi from "../../api/musicApi";
import { useParams } from "react-router-dom";
import SongFeature from "./SongFeature/SongFeature";
import { useDispatch } from "react-redux";
import { setPlayingPlaylist } from "../ZingChartPage/musicSlice";
import TopicSlide from "../../components/TopicSlide/TopicSlide";
import Mv from "../../components/MV/Mv";
import PlaylistArtistSlide from "../Playlist/PlaylistArtistSlide/PlaylistArtistSlide";

Artist.propTypes = {};

function Artist(props) {
  const dispatch = useDispatch();

  const { artistName } = useParams();

  const [data, setData] = useState();
  const [songFeature, setSongFeature] = useState([]);
  const [single, setSingle] = useState([]);
  const [album, setAlbum] = useState([]);
  const [more, setMore] = useState([]);
  const [camel, setCamel] = useState([]);
  const [video, setVideo] = useState([]);
  const [artist, setArtist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArtist = async () => {
      const { data } = await musicApi.getArtist(artistName);

      if (!data) {
        alert("Không có thông tin tác giả");
      }

      setData(data);
      data.sections.map((item) => {
        if (item.title === "Bài hát nổi bật") {
          setSongFeature(item.items);
        }
        if (item.title === "Single & EP") {
          setSingle(item.items);
        }
        if (item.title === "Album") {
          setAlbum(item.items);
        }
        if (item.title === "MV") {
          setVideo(item.items);
        }
        if (item.title === "Tuyển tập") {
          setMore(item.items);
        }
        if (item.title === "Xuất hiện trong") {
          setCamel(item.items);
        }
        if (item.title === "Bạn Có Thể Thích") {
          setArtist(item.items);
        }
      });

      dispatch(setPlayingPlaylist(data.sections[0].items));
      setLoading(false);
    };

    getArtist();
  }, [artistName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [artistName]);

  return (
    <div className="artist-page">
      <div className="artist-container">
        <ArtistHero artist={data} />
        <div className="container-fluid">
          <div className="single">
            <h2>Bài hát nổi bật</h2>
            <SongFeature data={songFeature} />
          </div>
          <div className="single">
            <h2>Single & EP</h2>
            <TopicSlide loading={loading} data={single} />
          </div>
          {album.length > 0 && (
            <div className="single">
              <h2>Album</h2>
              <TopicSlide loading={loading} data={album} />
            </div>
          )}
          {more.length > 0 && (
            <div className="single">
              <h2>Tuyển tập</h2>
              <TopicSlide loading={loading} data={more} />
            </div>
          )}
          {Mv.length > 0 && (
            <div className="single">
              <h2>MV</h2>
              <Mv loading={loading} data={video} />
            </div>
          )}
          {camel.length > 0 && (
            <div className="single">
              <h2>Xuất hiện trong</h2>
              <TopicSlide loading={loading} data={camel} />
            </div>
          )}

          {artist.length > 0 && (
            <div className="single">
              <h2>Bạn có thể thích</h2>
              <PlaylistArtistSlide data={artist} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Artist;
