import React from "react";
import PropTypes from "prop-types";
import "./MainButton.css";

MainButton.propTypes = {};

function MainButton({ title }) {
  return <div className="button">{title}</div>;
}

export default MainButton;
