import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import musicApi from "../../../api/musicApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LineChart({ props }) {
  const [labels, setLabels] = useState();
  const [counter1, setCounter1] = useState([]);
  const [counter2, setCounter2] = useState([]);
  const [counter3, setCounter3] = useState([]);
  const [song, setSong] = useState([]);

  useEffect(() => {
    const getChart = async () => {
      try {
        const zingChart = await musicApi.getCharthome();
        setLabels(() => {
          let arr = [];
          zingChart.data.RTChart.chart.times.map((item) => {
            if (parseInt(item.hour) % 2 === 0) {
              arr.push(item.hour + ":00");
            }
            return arr;
          });
          return arr;
        });
        setSong(zingChart.data.RTChart.items.slice(0, 3));

        setCounter1(() => {
          let c1 = [];
          const arrChart = Object.values(zingChart.data.RTChart.chart.items);
          arrChart[0].map((item, i) => {
            if (parseInt(item.hour) % 2 === 0) {
              c1.push(item.counter);
            }
            return c1;
          });
          return c1;
        });
        setCounter2(() => {
          let c2 = [];
          const arrChart = Object.values(zingChart.data.RTChart.chart.items);
          arrChart[1].map((item, i) => {
            if (parseInt(item.hour) % 2 === 0) {
              c2.push(item.counter);
            }
            return c2;
          });
          return c2;
        });
        setCounter3(() => {
          let c3 = [];
          const arrChart = Object.values(zingChart.data.RTChart.chart.items);
          arrChart[2].map((item, i) => {
            if (parseInt(item.hour) % 2 === 0) {
              c3.push(item.counter);
            }
            return c3;
          });
          return c3;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getChart();
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: song[0]?.title,
        data: counter1,
        borderColor: "#4f75cb",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: song[1]?.title,
        data: counter2,
        borderColor: "rgb(255, 99, 0, .5)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: song[2]?.title,
        data: counter3,
        borderColor: "rgb(39, 189, 156)",
        backgroundColor: "rgb(39, 189, 156)",
        tension: 0.4,
      },
    ],
  };
  return (
    <Line
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: {
            display: false,
          },
          datalabels: {
            display: false,
          },
        },
        scales: {
          y: {
            ticks: {
              display: false,
            },
            grid: {
              color: "rgba(255,255,255, .1)",
              offsetGridLines: true,
              display: true,
              borderDash: [6, 2],
              tickMarkLength: 5,
            },
          },
          x: {
            ticks: {
              color: "#ccc",
            },
            grid: {
              display: false,
            },
          },
        },
      }}
      data={data}
    />
  );
}
