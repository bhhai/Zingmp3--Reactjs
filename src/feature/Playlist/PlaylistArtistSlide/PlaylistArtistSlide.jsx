import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import AddReactionIcon from "@mui/icons-material/AddReaction";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import musicApi from "../../../api/musicApi";
import SwiperCore, { Autoplay, Pagination } from "swiper";

PlaylistArtistSlide.propTypes = {};

SwiperCore.use([Pagination, Autoplay]);

function PlaylistArtistSlide({ data }) {
  const [artistAlias, setAstistAlias] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);

  const swiperRef = useRef(null);

  if (artistAlias) {
    const getArtist = async () => {
      const { data } = await musicApi.getArtist(artistAlias);

      setArtistInfo(data);
    };

    getArtist();
  }

  return (
    <div
      onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
      onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
    >
      <Swiper
        ref={swiperRef}
        id="slide"
        spaceBetween={25}
        autoplay={{
          delay: 5000,
        }}
        breakpoints={{
          // when window width is >= 640px
          0: { slidesPerView: 2 },
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={item.id}>
              <Link to={item.link}>
                <div className="artist__thumb">
                  <img src={item.thumbnailM} alt={item.name} />
                </div>
              </Link>
              <div className="artist__content">
                <Link to={item.link} id="artist__hover">
                  <h4 className="artist__name artist__btn">{item.name}</h4>
                  <div className="artist__box-hover" id="hover"></div>
                </Link>
                <span className="artist__follower">
                  {item?.totalFollow + " người quan tâm"}
                </span>
                <div className="artist__btn-fl">
                  <AddReactionIcon fontSize="small" />
                  <h4>Quan tâm</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default PlaylistArtistSlide;
