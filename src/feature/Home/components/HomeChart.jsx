import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import musicApi from "../../../api/musicApi";
import ZingChart from "../../../components/ZingChart/ZingChart";
import WeekChart from "../../../components/ZingChart/WeekChart/WeekChart";

HomeChart.propTypes = {};

function HomeChart(props) {
  const [zingChart, setZingChart] = useState({});
  const [weekChart, setWeekChart] = useState([]);

  useEffect(() => {
    const getHomePage = async () => {
      try {
        const zingChart = await musicApi.getCharthome();

        console.log(zingChart);
        setZingChart(zingChart.data.RTChart);
        setWeekChart(Object.values(zingChart.data.weekChart));
      } catch (error) {
        console.log(error);
      }
    };
    getHomePage();
  }, []);
  return (
    <>
      <ZingChart data={zingChart} />
      <WeekChart data={weekChart} />
    </>
  );
}

export default HomeChart;
