import React, { useEffect, useState } from "react";
import musicApi from "../../../api/musicApi";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./SongChart.css";
import { Link } from "react-router-dom";
import Player from "../../Player/Player";
import { Skeleton } from "@mui/material";
import LazyLoad from "react-lazyload";

SongChart.propTypes = {};

function SongChart(props) {
  const [song, setSong] = useState([]);
  const [songId, setSongId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSong = async () => {
      const response = await musicApi.getCharthome();
      setSong(response.data.RTChart.items.slice(0, 3));

      setLoading(false);
    };
    getSong();
  }, []);

  const getSongId = (id) => {
    return setSongId(id);
  };

  return (
    <>
      <div className="title">
        <h2>#zingchart</h2>
        <PlayCircleFilledWhiteIcon fontSize="large" />
      </div>
      {loading
        ? Array.from(new Array(3)).map((x, i) => (
            <div key={i} className="song__chart">
              <div className="song__count">
                <Skeleton animation="wave" height={60} width={30} />
              </div>
              <div className="song__item">
                <div className="song__thumbnail">
                  <Skeleton animation="wave" height={60} width={60} />
                </div>
                <div className="song__title">
                  <Skeleton animation="wave" height={24} width={220} />
                  <Skeleton animation="wave" height={14} width={80} />
                </div>
              </div>
            </div>
          ))
        : song.map((item, i) => (
            <div
              className="song__chart"
              key={item.encodeId}
              onClick={() => getSongId(item.encodeId)}
            >
              <div className="song__count">{i + 1}</div>
              <div className="song__item">
                <div className="song__thumbnail">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="song__thumbnail-img"
                  />
                  <div className="img-overlay"></div>
                  <PlayArrowIcon className="song__icon" fontSize="medium" />
                </div>
                <div className="song__title">
                  <span className="song__title-item">{item.title}</span>
                  <div className="song__artist">
                    {item.artists.map((artist, i) => (
                      <Link
                        to={artist.link}
                        className="artist__btn"
                        key={artist.id}
                      >
                        {artist.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  );
}

export default SongChart;
