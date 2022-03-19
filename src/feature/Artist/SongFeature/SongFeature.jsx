import React from "react";
import PropTypes from "prop-types";
import ChartPlayList from "../../ZingChartPage/ChartPlayList/ChartPlayList";
import SongFeatureSlide from "../SongFeatureSlide";

SongFeature.propTypes = {};

function SongFeature({ data }) {
  return (
    <>
      {data && (
        <div className="song-feature">
          <div className="song-feature__slide">
            <SongFeatureSlide data={data} />
          </div>
          <div className="song-feature__songs">
            <ChartPlayList iconNone="a" data={data && data} />
          </div>
        </div>
      )}
    </>
  );
}

export default SongFeature;
