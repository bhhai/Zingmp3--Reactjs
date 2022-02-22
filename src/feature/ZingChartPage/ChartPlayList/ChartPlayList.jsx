import React from "react";
import PropTypes from "prop-types";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link, NavLink } from "react-router-dom";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./ChartPlayList.css";
import Player from "../../../components/Player/Player";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setPlayingSong } from "../musicSlice";

ChartPlayList.propTypes = {};

function ChartPlayList({ data }) {
  const [songId, setSongId] = useState();

  const dispatch = useDispatch();

  function convert(value) {
    return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : "00");
  }

  function findElement(e) {
    const element = e.target;
    const key = element
      .closest(".chart-playlist__item")
      .getAttribute("data-key");

    setSongId(key);
    dispatch(setPlayingSong(key));
    return key;
  }
  return (
    <div className="chart-page__playlist">
      {data &&
        data.map((item, i) => (
          <div
            key={i}
            className="chart-playlist__item"
            data-key={item.encodeId}
            onClick={(e) => findElement(e)}
          >
            <div className="playlist__item-position">
              <span>{i + 1}</span>
            </div>
            <div className="playlist__item-title">
              <div className="playlist__thumbnail">
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
            <div className="playlist__duration">{convert(item.duration)}</div>
          </div>
        ))}
    </div>
  );
}

export default ChartPlayList;
