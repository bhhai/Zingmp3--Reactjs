import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router-dom";
import musicApi from "../../api/musicApi";
import Loading from "../../components/Loading/Loading";
import TopicSlide from "../../components/TopicSlide/TopicSlide";
import ZingChart from "../../components/ZingChart/ZingChart";
import HomeEventSlide from "../Home/components/HomeEventSlide";
import HomeAlbum from "./components/HomeAlbum";
import HomeBanner from "./components/HomeBanner";
import HomeNewRelease from "./components/HomeNewRelease";
import HomePlaylist2 from "./components/HomePlaylist2";
import "../../components/ZingChart/WeekChart/WeekChart.css";
import "./Home.css";

Home.propTypes = {};

function Home(props) {
  const [top100, setTop100] = useState([]);
  const [zingChart, setZingChart] = useState({});
  const [weekChart, setWeekChart] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHomePage = async () => {
      try {
        const zingChart = await musicApi.getCharthome();

        setZingChart(zingChart.data.RTChart);
        setWeekChart(Object.values(zingChart.data.weekChart));
      } catch (error) {
        console.log(error);
      }
    };
    getHomePage();
  }, []);

  useEffect(() => {
    const getTop100 = async () => {
      try {
        const response = await musicApi.getTop100();
        setTop100(response.data[0].items);
      } catch (error) {
        console.log(error);
      }
    };
    getTop100();
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        {/* Home Banner */}
        <HomeBanner />

        <HomePlaylist2 />

        <LazyLoad placeholder={<Loading />}>
          <ZingChart data={zingChart} />
        </LazyLoad>

        {weekChart && (
          <div className="week-chart">
            {weekChart.map((item, i) => (
              <Link
                to={item.link}
                key={item.playlistId}
                className="week-chart__banner"
              >
                <img src={item.cover} alt="" />
              </Link>
            ))}
          </div>
        )}

        <HomeEventSlide />

        <div className="home__new-release">
          <h2 className="home__new-title">Top 100</h2>
          <TopicSlide data={top100} />
        </div>

        <HomeNewRelease />

        <HomeAlbum />
      </div>
    </div>
  );
}

export default Home;
