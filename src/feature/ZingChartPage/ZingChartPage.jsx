import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { LineChart } from "../../components/ZingChart/LineChart/LineChart";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import "./ZingChartPage.css";
import musicApi from "../../api/musicApi";
import ChartPlayList from "./ChartPlayList/ChartPlayList";
import { useDispatch, useSelector } from "react-redux";
import { setPlayingPlaylist, setPlayingSong } from "./musicSlice";

ZingChartPage.propTypes = {};

function ZingChartPage(props) {
  const dispatch = useDispatch();

  const playingPlaylist = useSelector((state) => state.music.playingPlaylist);

  const [playList, setPlayList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await musicApi.getCharthome();

      setPlayList(response.data.RTChart.items);

      dispatch(setPlayingPlaylist(response.data.RTChart.items));
      dispatch(setPlayingSong(response.data.RTChart.items[0].encodeId));
    };

    getData();
  }, []);

  return (
    <div className="chart-page">
      <div className="top__title">
        <h2>#zingchart</h2>
        <PlayCircleIcon fontSize="large" />
      </div>
      <div className="top__chart">
        <LineChart />
      </div>

      <ChartPlayList data={playList} />
    </div>
  );
}

export default ZingChartPage;
