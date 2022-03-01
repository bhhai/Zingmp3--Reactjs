import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayingSong } from "../musicSlice";
import "./ChartPlayList.css";
import SongSkeleton from "./SongSkeleton";

ChartPlayList.propTypes = {};

function ChartPlayList({ data, loading }) {
  const playingSong = useSelector((state) => state.music.playingSong);

  const dispatch = useDispatch();

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute <= 9 ? `0${minute}` : minute}:${
      secondLeft <= 9 ? `0${secondLeft}` : secondLeft
    }`;
  }

  return (
    <div className="chart-page__playlist">
      {loading ? (
        <SongSkeleton length={10} />
      ) : (
        data.map((item, i) => (
          <div
            key={i}
            className={`chart-playlist__item ${
              playingSong === item.encodeId ? "playing-active" : ""
            }`}
            data-key={item.encodeId}
            onClick={() => dispatch(setPlayingSong(item?.encodeId))}
          >
            <div className="playlist__item-position">
              <span>{i + 1}</span>
            </div>
            <div className="playlist__item-title">
              <div className="playlist__thumbnail">
                <i className="playing-gif"></i>
                <img src={item.thumbnail} alt={item.title} />
                <div className="thumb__overlay"></div>
                <PlayArrowIcon className="thumb__icon" />
                <RemoveIcon />
              </div>
              <div className="playlist__name">
                <span>{item.title}</span>
                <div className="playlist__artist">
                  {item?.artists.length > 1
                    ? item.artists.map((art, i) => {
                        let len = item.artists.length;
                        return (
                          <Link to={art.link} key={art.id} className="artist">
                            {len - 1 === i ? art.name + "" : art.name + ",  "}
                          </Link>
                        );
                      })
                    : item?.artists.map((art, i) => (
                        <Link to={art.link} key={art.id} className="artist">
                          {art.name}
                        </Link>
                      ))}
                </div>
              </div>
            </div>
            <Link to={item.album.link} className="playlist__album">
              {item.album.title}
            </Link>
            <div className="playlist__duration">
              {formatDuration(item.duration)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ChartPlayList;
