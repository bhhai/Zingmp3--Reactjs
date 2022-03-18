import React from "react";
import PropTypes from "prop-types";
import MainButton from "../../../components/Button/MainButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "../Playlist.css";
import { Skeleton } from "@mui/material";
import LazyLoad from "react-lazyload";

PlaylistBanner.propTypes = {};

function PlaylistBanner({ playlist, playing, loading }) {
  return (
    <>
      {loading ? (
        <>
          <div className="playlist__banner">
            <div className={`playlist__thumb`}>
              <Skeleton variant="rectangular" height={300} width="100%" />
            </div>
            <div className="playlist__des">
              <div className="playlist__title">
                <h4>
                  <Skeleton variant="rectangular" height={20} width="100%" />
                </h4>
                <p>
                  <Skeleton
                    variant="rectangular"
                    height={14}
                    width="40%"
                    style={{ margin: "auto" }}
                  />
                </p>
                <span>
                  <Skeleton
                    variant="rectangular"
                    height={14}
                    width="60%"
                    style={{ margin: "auto" }}
                  />
                </span>
              </div>
              <div className="playlist__bottom-btn">
                <Skeleton variant="rectangular" height={30} width="100%" />
                <div className="bottom__btn">
                  <div className="bottom__item">
                    <Skeleton
                      variant="rectangular"
                      height={30}
                      width={30}
                      style={{ margin: "auto" }}
                    />
                  </div>
                  <div className="bottom__item">
                    <Skeleton
                      variant="rectangular"
                      height={30}
                      width={30}
                      style={{ margin: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        playlist && (
          <div className="playlist__banner">
            <div className={`playlist__thumb`}>
              <LazyLoad
                placeholder={
                  <img
                    src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB"
                    className="playlist__banner-img"
                    alt=""
                  />
                }
              >
                <img
                  src={playlist?.thumbnailM}
                  className={`playlist__banner-img ${
                    playing ? "isPlaying" : ""
                  }`}
                  alt={playlist.title}
                />
              </LazyLoad>
            </div>
            <div className="playlist__des">
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
          </div>
        )
      )}
    </>
  );
}

export default PlaylistBanner;
