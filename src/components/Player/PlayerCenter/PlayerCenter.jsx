import React from "react";
import PropTypes from "prop-types";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RepeatIcon from "@mui/icons-material/Repeat";
import "./PlayerCenter.css";
import { setNextSong } from "../../../feature/ZingChartPage/musicSlice";

PlayerCenter.propTypes = {};

function PlayerCenter(props) {
  return (
    <div className="player__center">
      <div className="center__control">
        <div className="center__btn">
          <div className="center__control-item">
            <ShuffleIcon />
          </div>
          <div className="center__control-item">
            <SkipPreviousIcon />
          </div>
          <div className="center__control-item mid-play">
            <PlayArrowIcon />
          </div>
          <div className="center__control-item" onClick={() => setNextSong()}>
            <SkipNextIcon />
          </div>
          <div className="center__control-item">
            <RepeatIcon />
          </div>
        </div>
        <div className="center__slider"></div>
      </div>
    </div>
  );
}

export default PlayerCenter;
