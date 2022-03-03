import React from "react";
import PropTypes from "prop-types";
import MainButton from "../../../components/Button/MainButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../Playlist.css";

PlaylistBanner.propTypes = {};

function PlaylistBanner({ playlist }) {
  return (
    <>
      {playlist && (
        <div className="playlist__banner">
          <div className="playlist__thumb">
            <img src={playlist?.thumbnailM} alt={playlist.title} />
          </div>
          <div className="playlist__title">
            <h4>{playlist?.title}</h4>
            <p className="playlist__user">{playlist.artistsNames}</p>
            <span className="playlist__likecount">
              {playlist.like + " người yêu thích"}
            </span>
          </div>
          <div className="playlist__bottom-btn">
            <MainButton title="Phát tất cả" />
            <div className="bottom__btn">
              <div className="bottom__item">
                <FavoriteBorderIcon />
              </div>
              <div className="bottom__item">
                <MoreHorizIcon />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PlaylistBanner;
