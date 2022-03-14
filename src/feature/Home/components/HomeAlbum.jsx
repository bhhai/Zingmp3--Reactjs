import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import musicApi from "../../../api/musicApi";
import TopicSlide, {
  ZingChoiceSlide,
} from "../../../components/TopicSlide/TopicSlide";

HomeAlbum.propTypes = {};

function HomeAlbum(props) {
  const [album, setAlbum] = useState([]);
  const [zingchoice, setZingchoice] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await musicApi.getHome(5);

      setZingchoice(res.data.items[1].items);
      setAlbum(res.data.items[0].items);
    };

    getData();
  }, []);
  return (
    <>
      <TopicSlide data={album} />

      <div className="home__new-release">
        <h2 className="home__new-title">Nghệ Sĩ Zing Choice</h2>
        <ZingChoiceSlide data={zingchoice} />
      </div>
    </>
  );
}

export default HomeAlbum;
