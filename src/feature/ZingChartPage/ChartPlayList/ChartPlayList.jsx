import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import React, { useState } from "react";
import LazyLoad from "react-lazyload";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPlayingSong } from "../musicSlice";
import OutLineButton from "../../../components/Button/OutLineButton";
import "./ChartPlayList.css";
import SongSkeleton from "./SongSkeleton";

ChartPlayList.propTypes = {};

function ChartPlayList({ data, loading, icon, iconNone }) {
  const playingSong = useSelector((state) => state.music.playingSong);
  const [itemShow, setItemShow] = useState(10);

  const dispatch = useDispatch();

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute <= 9 ? `0${minute}` : minute}:${
      secondLeft <= 9 ? `0${secondLeft}` : secondLeft
    }`;
  }

  const handleSongClick = (id, songStatus) => {
    if (songStatus === 1) {
      return dispatch(setPlayingSong(id));
    } else {
      alert("Đây là bài VIP. Nạp tiền vào mà nghe :)");
    }
  };

  const handelShowMoreSong = () => {
    setItemShow(data.length);
  };

  return (
    <div className="chart-page__playlist">
      {loading ? (
        <SongSkeleton length={10} />
      ) : (
        data.slice(0, itemShow).map((item, i) => (
          <div
            key={i}
            className={`chart-playlist__item ${
              playingSong === item.encodeId ? "playing-active" : ""
            } ${item.streamingStatus !== 1 ? " VIP" : ""}`}
            data-key={item.encodeId}
            onClick={() => handleSongClick(item.encodeId, item.streamingStatus)}
          >
            <div
              className={`playlist__item-position ${
                iconNone ? " icon-none" : ""
              }`}
            >
              {icon ? (
                <LibraryMusicIcon
                  style={{ color: "#837f8a", marginLeft: "10px" }}
                />
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <div className="playlist__item-title">
              <div className="playlist__thumbnail">
                <i className="playing-gif"></i>
                <LazyLoad
                  placeholder={
                    <img
                      src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB"
                      className="chart__thumb-img"
                      alt=""
                    />
                  }
                >
                  <img
                    src={item.thumbnail}
                    className="chart__thumb-img"
                    alt={item.title}
                  />
                </LazyLoad>
                <div className="thumb__overlay"></div>
                <PlayArrowIcon className="thumb__icon" />
              </div>
              <div className="playlist__name">
                <span>{item?.title}</span>
                <div className="playlist__artist">
                  {item.artists !== undefined && item?.artists.length > 1
                    ? item.artists.map((art, i) => {
                        return (
                          <Link to={art.link} key={art.id} className="artist">
                            {item?.artists.length - 1 === i
                              ? art.name + ""
                              : art.name + ",  "}
                          </Link>
                        );
                      })
                    : item.artists !== undefined &&
                      item?.artists.map((art, i) => (
                        <Link to={art.link} key={art.id} className="artist">
                          {art.name}
                        </Link>
                      ))}
                </div>
              </div>
            </div>
            <Link
              to={item.album ? item.album.link : ""}
              className="playlist__album"
            >
              {item.album ? item.album.title : ""}
            </Link>
            <div className="playlist__duration">
              {formatDuration(item.duration)}
            </div>
          </div>
        ))
      )}
      {itemShow === 10 ? (
        <div className="chart-page__more-btn">
          <OutLineButton onClick={handelShowMoreSong} title="Xem top 100" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ChartPlayList;
