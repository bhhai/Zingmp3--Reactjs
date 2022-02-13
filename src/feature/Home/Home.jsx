import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Home.css";
import NhacCuaTui from "nhaccuatui-api-full";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import TopicSlide from "../../components/TopicSlide/TopicSlide";

Home.propTypes = {};

function Home(props) {
  const [topicEvent, setTopicEvent] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await NhacCuaTui.getHome();
      setTopicEvent(response.topicEvent);
      console.log(response.topicEvent);
    };

    getData();
  }, []);

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home__slide">
          <HeroSlider />
        </div>
        <div className="home__topic">
          {topicEvent.map((item, i) => (
            <div key={i} className="home__topic-block">
              <h2 className="home__topic-title">
                {item.groupName.split("_")[0]}
              </h2>
              <TopicSlide data={item.listPlaylist} />
            </div>
          ))}
        </div>
        <div className="home__new-release">
          <h2 className="home__new-title">Mới phát hành</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
