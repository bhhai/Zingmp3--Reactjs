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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await musicApi.getCharthome();

        setPlayList(response.data.RTChart.items);

        dispatch(setPlayingPlaylist(response.data.RTChart.items));

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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

      <ChartPlayList data={playList} loading={loading} />
    </div>
  );
}

export default ZingChartPage;
