import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import "./TopicCard.css";

TopicCard.propTypes = {};

function TopicCard({
  src,
  title,
  playlistKey,
  description,
  link,
  release,
  loading,
}) {
  return (
    <Link to={link} className="topic">
      <div className="topic__thumbnail">
        <LazyLoad
          placeholder={
            <img
              src="https://sherwin.scene7.com/is/image/sw/color-swatch?_tparam_size=250,250&layer=comp&_tparam_color=C2C0BB"
              className="topic__image"
              alt=""
            />
          }
        >
          <img src={src} alt={title} className="topic__image" />
        </LazyLoad>
        <div className="topic__icon">
          <FavoriteBorderIcon />
          <PlayCircleOutlineIcon
            fontSize="medium"
            style={{ width: "50px", height: "50px" }}
            className="topic__play-icon"
          />
          <MoreHorizIcon />
        </div>
        <div className="overlay"></div>
      </div>

      <h3 className="topic__title">{title}</h3>
      <span className="topic__description">
        {description.length > 100
          ? description.slice(0, 87) + "..."
          : description || release}
      </span>
    </Link>
  );
}

export default TopicCard;
