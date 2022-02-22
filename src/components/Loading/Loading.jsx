import React from "react";
import PropTypes from "prop-types";
import "./Loading.css";

Loading.propTypes = {};

function Loading(props) {
  return (
    <div className="div">
      <span className="span"></span>
      <span className="span"></span>
      <span className="span"></span>
      <span className="span"></span>
    </div>
  );
}

export default Loading;
