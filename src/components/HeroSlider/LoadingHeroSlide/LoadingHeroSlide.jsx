import React from "react";
import PropTypes from "prop-types";

LoadingHeroSlide.propTypes = {};

function LoadingHeroSlide(props) {
  return (
    <div
      className="loading-item"
      style={{ height: "220px", width: "220px", backgroundColor: "#ccc" }}
    ></div>
  );
}

export default LoadingHeroSlide;
