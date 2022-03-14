import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import musicApi from "../../../api/musicApi";
import HomeEvent from "../../../components/HomeEvent/HomeEvent";

HomeEventSlide.propTypes = {};

function HomeEventSlide(props) {
  const [listEvent, setListEvent] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await musicApi.getHome(3);

      setListEvent(res.data.items[4]);
    };

    getData();
  }, []);
  return (
    <>
      {/* {listEvent !== undefined && (
        <div className="home__new-release">
          <h2 className="home__new-title">Sự Kiện</h2>
          <HomeEvent data={listEvent} />
        </div>
      )} */}
    </>
  );
}

export default HomeEventSlide;
