import React, { useEffect, useState } from "react";
import musicApi from "../../api/musicApi";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import LoadingHeroSlide from "../../components/HeroSlider/LoadingHeroSlide/LoadingHeroSlide";
import HomeEvent from "../../components/HomeEvent/HomeEvent";
import Loading from "../../components/Loading/Loading";
import NewReleaseSlide from "../../components/NewReleaseSlide/NewReleaseSlide";
import TopicSlide, {
  ZingChoiceSlide,
} from "../../components/TopicSlide/TopicSlide";
import WeekChart from "../../components/ZingChart/WeekChart/WeekChart";
import ZingChart from "../../components/ZingChart/ZingChart";
import "./Home.css";

Home.propTypes = {};

function Home(props) {
  const [zingChart, setZingChart] = useState({});
  const [heroSlider, setHeroSlider] = useState([]);
  const [homePlaylist, setHomePlaylist] = useState();
  const [homePlaylist2, setHomePlaylist2] = useState();
  const [weekChart, setWeekChart] = useState();
  const [top100, setTop100] = useState([]);
  const [event, setEvent] = useState();
  const [zingChoice, setZingChoice] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [album, setAlbum] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHomePage = async () => {
      try {
        const zingChart = await musicApi.getCharthome();
        setZingChart(zingChart.data.RTChart);
      } catch (error) {
        console.log(error);
      }
    };
    getHomePage();
  }, []);

  useEffect(() => {
    const getChart = async () => {
      try {
        const week = await musicApi.getCharthome();
        setWeekChart(Object.values(week.data.weekChart));
      } catch (error) {
        console.log(error);
      }
    };
    getChart();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const rp = await musicApi.getHome(1);
        const response = await musicApi.getHome(2);
        const home3 = await musicApi.getHome(3);
        const home4 = await musicApi.getHome(4);
        const home5 = await musicApi.getHome(5);

        setHeroSlider(rp.data.items[0].items);
        setHomePlaylist(rp.data);

        setHomePlaylist2(response.data);

        setEvent(home3.data.items[4]);

        setZingChoice(home5.data.items[1].items);

        setNewRelease(home4.data.items[1].items);

        setAlbum(home5.data.items[0].items);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
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
      {loading ? (
        <Loading />
      ) : (
        <div className="home-container">
          <div className="home__slide">
            <HeroSlider slider={heroSlider} />
          </div>
          <div className="home__new-release">
            <h2 className="home__new-title">{homePlaylist.items[3].title}</h2>
            <TopicSlide data={homePlaylist.items[3].items} />
          </div>
          <div className="home__new-release">
            <h2 className="home__new-title">{homePlaylist.items[4].title}</h2>
            <TopicSlide data={homePlaylist.items[4].items} />
          </div>
          <div className="home__new-release">
            <h2 className="home__new-title">{homePlaylist2.items[0].title}</h2>
            <TopicSlide data={homePlaylist2.items[0].items} />
          </div>
          <div className="home__new-release">
            <h2 className="home__new-title">{homePlaylist2.items[1].title}</h2>
            <TopicSlide data={homePlaylist2.items[1].items} />
          </div>

          {/* Zing chart */}
          <ZingChart data={zingChart} />
          {/* Week chart */}
          <WeekChart data={weekChart} />

          {/* Zing Choice */}
          <div className="home__new-release">
            <h2 className="home__new-title">Nghệ Sĩ Zing Choice</h2>
            <ZingChoiceSlide data={zingChoice} />
          </div>

          {/* Top 100 */}
          <div className="home__new-release">
            <h2 className="home__new-title">Top 100</h2>
            <TopicSlide data={top100} />
          </div>

          {/* Home event */}
          <div className="home__new-release">
            <h2 className="home__new-title">Sự Kiện</h2>
            <HomeEvent data={event} />
          </div>

          {/* New Release */}
          <div className="home__new-release">
            <h2 className="home__new-title">Mới Phát Hành</h2>
            <NewReleaseSlide data={newRelease} />
            <br />
            <TopicSlide data={album} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
