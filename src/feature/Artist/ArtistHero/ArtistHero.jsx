import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import MainButton from "../../../components/Button/MainButton";
import PlayArrow from "@mui/icons-material/PlayArrow";

ArtistHero.propTypes = {};

function ArtistHero({ artist }) {
  const [follow, setFollow] = useState("");
  useEffect(() => {
    const convertTotalFollow = () => {
      const fl = artist?.totalFollow.toString();
      if (artist) {
        if (fl.length > 6) {
          setFollow(fl.slice(-6) + "M");
          return fl.slice(-6) + "M";
        } else if (fl.length > 3) {
          setFollow(fl.slice(-3) + "K");

          return fl.slice(-3) + "K";
        }
      } else {
        console.log("ko co");
      }
    };

    convertTotalFollow();
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
