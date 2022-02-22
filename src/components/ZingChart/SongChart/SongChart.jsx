import React, { useEffect, useState } from "react";
import musicApi from "../../../api/musicApi";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./SongChart.css";
import { Link } from "react-router-dom";
import Player from "../../Player/Player";

SongChart.propTypes = {};

function SongChart(props) {
  const [song, setSong] = useState([]);
  const [songId, setSongId] = useState();

  useEffect(() => {
    const getSong = async () => {
      const response = await musicApi.getCharthome();
      setSong(response.data.RTChart.items.slice(0, 3));
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
      {song.map((item, i) => (
        <div
          className="song__chart"
          key={item.encodeId}
          onClick={() => getSongId(item.encodeId)}
        >
          {songId ? <Player id={songId} /> : console.log("ko co songid")}
          <div className="song__count">{i + 1}</div>
          <div className="song__item">
            <div className="song__thumbnail">
              <img src={item.thumbnail} alt={item.title} />
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
