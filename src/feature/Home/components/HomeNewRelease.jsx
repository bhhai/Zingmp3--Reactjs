import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import musicApi from "../../../api/musicApi";
import NewReleaseSlide from "../../../components/NewReleaseSlide/NewReleaseSlide";

HomeNewRelease.propTypes = {};

function HomeNewRelease(props) {
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await musicApi.getHome(4);

      setNewRelease(res.data.items[0].items);
    };

    getData();
  }, []);
  return (
    <div className="home__new-release">
      <h2 className="home__new-title">Mới Phát Hành</h2>
      <NewReleaseSlide data={newRelease} />
    </div>
  );
}

export default HomeNewRelease;
