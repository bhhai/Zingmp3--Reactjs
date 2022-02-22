import React from "react";
import PropTypes from "prop-types";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./TopicCard.css";
import { Link } from "react-router-dom";

TopicCard.propTypes = {};

function TopicCard({ src, title, playlistKey, description, link, release }) {
  return (
    <Link to={link} className="topic">
      <div className="topic__thumbnail">
        <img src={src} alt={title} className="topic__image" />
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
