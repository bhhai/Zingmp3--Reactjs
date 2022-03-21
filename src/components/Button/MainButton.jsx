import React from "react";
import PropTypes from "prop-types";
import "./MainButton.css";

MainButton.propTypes = {};

function MainButton({ title, icon }) {
  return (
    <div className="button-main">
      {icon}
      <span>{title}</span>
    </div>
  );
}

export default MainButton;
