import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import musicApi from "../../../api/musicApi";
import TopicSlide from "../../../components/TopicSlide/TopicSlide";

HomePlaylist2.propTypes = {};

function HomePlaylist2(props) {
  const [playlist1, setPlaylist1] = useState({});
  const [playlist2, setPlaylist2] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await musicApi.getHome(2);

      setPlaylist1(res.data.items[0]);
      setPlaylist2(res.data.items[1]);

      setLoading(false);
    };

    getData();
  }, []);
  return (
    <>
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

export default HomePlaylist2;
