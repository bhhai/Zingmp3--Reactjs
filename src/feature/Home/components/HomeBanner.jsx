import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import HeroSlider from "../../../components/HeroSlider/HeroSlider";
import musicApi from "../../../api/musicApi";
import TopicSlide from "../../../components/TopicSlide/TopicSlide";

HomeBanner.propTypes = {};

function HomeBanner(props) {
  const [heroSlider, setHeroSlider] = useState([]);
  const [playlist1, setPlaylist1] = useState({});
  const [playlist2, setPlaylist2] = useState({});
  const [playlist3, setPlaylist3] = useState({});
  const [playlist4, setPlaylist4] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const res = await musicApi.getHome(1);
      setHeroSlider(res.data.items[0].items);

      setPlaylist1(res.data.items[3]);
      setPlaylist2(res.data.items[4]);
      setPlaylist3(res.data.items[0]);
      setPlaylist4(res.data.items[1]);

      setLoading(false);
    };

    getData();
  }, []);
  return (
    <>
      <div className="home__slide">
        <HeroSlider slider={heroSlider} loading={loading} />
      </div>
      <div className="home__new-release">
        <h2 className="home__new-title">{playlist1.title}</h2>
        <TopicSlide loading={loading} data={playlist1.items} />
      </div>

      <div className="home__new-release">
        <h2 className="home__new-title">{playlist2.title}</h2>
        <TopicSlide loading={loading} data={playlist2.items} />
      </div>
    </>
  );
}

export default HomeBanner;
