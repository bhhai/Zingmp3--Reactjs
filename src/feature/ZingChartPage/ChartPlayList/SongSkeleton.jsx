import React from "react";
import PropTypes from "prop-types";
import "./ChartPlayList.css";
import { Skeleton } from "@mui/material";

SongSkeleton.propTypes = {};

function SongSkeleton({ length }) {
  return (
    <>
      {Array.from(new Array(length)).map((x, index) => (
        <div className="chart-playlist__item">
          <div className="playlist__item-position">
            <Skeleton animation="wave" height={50} width="100%" />
          </div>
          <div className="playlist__item-title">
            <Skeleton animation="wave" height={50} width="80%" />
          </div>
          <div className="playlist__album">
            <Skeleton animation="wave" height={15} width="50%" />
          </div>
          <div className="playlist__duration">
            <Skeleton animation="wave" height={15} width="30px" />
          </div>
        </div>
      ))}
    </>
  );
}

export default SongSkeleton;
