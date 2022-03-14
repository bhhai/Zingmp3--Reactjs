import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./WeekChart.css";

WeekChart.propTypes = {};

function WeekChart({ data }) {
  return (
    <div className="week-chart">
      {data.length > 0 &&
        data.map((item, i) => (
          <Link
            to={item.link}
            key={item.playlistId}
            className="week-chart__banner"
          >
            <img src={item.cover} alt="" />
          </Link>
        ))}
    </div>
  );
}

export default WeekChart;
