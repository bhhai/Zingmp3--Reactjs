import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ChartPlayList from "../../ZingChartPage/ChartPlayList/ChartPlayList";
import { useParams } from "react-router-dom";
import musicApi from "../../../api/musicApi";

PlaylistSong.propTypes = {};

function PlaylistSong({ data, playlist }) {
  return (
    <div className="playlist__song">
      <div className="playlist__sort-description">
        <span>Lời tựa </span>
        <span className="descript">{playlist.sortDescription}</span>
      </div>
      {data.length > 0 ? <ChartPlayList data={data} icon="true" /> : ""}
    </div>
  );
}

export default PlaylistSong;
