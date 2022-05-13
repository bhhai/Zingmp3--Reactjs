import React from "react";
import OutLineButton from "../Button/OutLineButton";
import { LineChart } from "./LineChart/LineChart";
import SongChart from "./SongChart/SongChart";
import { useNavigate } from "react-router";
import "./ZingChart.css";

ZingChart.propTypes = {};

function ZingChart(props) {
  const navigate = useNavigate();

  return (
    <div className="zing-chart">
      <div className="zing-chart__container">
        <div className="zing-chart__overlay"></div>
        <div className="chart__song">
          <SongChart />
          <div className="btn">
            <OutLineButton
              title={"Xem thêm"}
              onClick={() => navigate("/zing-chart")}
            />
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
