import React from "react";
import PropTypes from "prop-types";
import "./OutLine.css";

OutLineButton.propTypes = {};

function OutLineButton({ title, onClick }) {
  return (
    <div className="button" onClick={onClick}>
      {title}
    </div>
  );
}

export default OutLineButton;
