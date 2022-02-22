import React from "react";
import OutLineButton from "../Button/OutLineButton";
import { LineChart } from "./LineChart/LineChart";
import SongChart from "./SongChart/SongChart";
import "./ZingChart.css";

ZingChart.propTypes = {};

function ZingChart(props) {
  return (
    <div className="zing-chart">
      <div className="zing-chart__container">
        <div className="zing-chart__overlay"></div>
        <div className="chart__song">
          <SongChart />
          <div className="btn">
            <OutLineButton title={"Xem thêm"} />
          </div>
        </div>
        <div className="chart__chart">
          <LineChart />
        </div>
      </div>
    </div>
  );
}

export default ZingChart;
