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

Artist.propTypes = {};

function Artist(props) {
  const dispatch = useDispatch();

  const { artistName } = useParams();

  const [data, setData] = useState();
  const [songFeature, setSongFeature] = useState([]);
  const [single, setSingle] = useState([]);
  const [more, setMore] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getArtist = async () => {
      const name = artistName.split("-").join("");
      const { data } = await musicApi.getArtist(name);

      if (!data) {
        alert("Không có thông tin tác giả");
      }

      setData(data);
      setSongFeature(data.sections[0].items);
      setSingle(data.sections[1].items);
      setMore(data.sections[4].items);

      dispatch(setPlayingPlaylist(data.sections[0].items));
      setLoading(false);
    };

    getArtist();
  }, [artistName]);

  return (
    <div className="artist-page">
      <div className="artist-container">
        <ArtistHero artist={data} />
        <div className="container-fluid">
          <SongFeature data={songFeature} />
          <div className="single">
            <h2>Single & EP</h2>
            <TopicSlide data={single} />
          </div>
          <div className="single">
            <h2>Xuất hiện trong</h2>
            <TopicSlide data={more} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
