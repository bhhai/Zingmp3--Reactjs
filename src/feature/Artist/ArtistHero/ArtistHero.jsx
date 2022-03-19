import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainButton from "../../../components/Button/MainButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

ArtistHero.propTypes = {};

function ArtistHero({ artist }) {
  const [follow, setFollow] = useState("");
  useEffect(() => {
    const formatCash = () => {
      if (artist) {
        const n = artist.totalFollow;

        if (n < 1e3) return n;
        if (n >= 1e3 && n < 1e6) setFollow(+(n / 1e3).toFixed(1) + "K");
        if (n >= 1e6 && n < 1e9) setFollow(+(n / 1e6).toFixed(1) + "M");
        if (n >= 1e9 && n < 1e12) setFollow(+(n / 1e9).toFixed(1) + "B");
        if (n >= 1e12) setFollow(+(n / 1e12).toFixed(1) + "T");
      }
    };

    formatCash();
  });

  return (
    <div className="artist-hero">
      {artist && (
        <div className="artist-hero__bg">
          <div
            className="blur"
            style={{ backgroundImage: `url(${artist?.thumbnail})` }}
          ></div>
          <div className="bg__alpha"></div>
          <div className="artist-hero__overview">
            <div className="hero-artist__container">
              <div>
                <h3 className="artist-hero__title">{artist?.name}</h3>
                <div className="artist-hero__description">
                  {artist?.sortBiography} <span>XEM THÊM</span>
                </div>
                <div className="artist-hero__bottom-btn">
                  <div className="btn-artist">
                    <PlayArrow />
                    <span>Phát nhạc</span>
                  </div>
                  <div className="btn-artist outline">Quan tâm • {follow}</div>
                </div>
                <div className="artist-hero__top-album">
                  <div className="top-album__banner">
                    <img src={artist.topAlbum.thumbnail} alt="" />
                  </div>
                  <div className="top-album__content">
                    <span>Mới nhất</span>
                    <div className="top-album__title">
                      {artist.topAlbum.title}
                    </div>
                    <div className="top-album__release">
                      {artist.topAlbum.releaseDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="artist-hero__banner">
                <img src={artist.thumbnail} alt={artist.name} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistHero;
