import React from "react";
import PropTypes from "prop-types";
import "./OutLine.css";

OutLineButton.propTypes = {};

function OutLineButton({ title }) {
  return <div className="button">{title}</div>;
}

export default OutLineButton;
