import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import AddReactionIcon from "@mui/icons-material/AddReaction";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

PlaylistArtistSlide.propTypes = {};

function PlaylistArtistSlide({ data }) {
  return (
    <>
      <Swiper
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
                <Link to={item.link}>
                  <h4 className="artist__name artist__btn">{item.name}</h4>
                </Link>
                <span className="artist__follower">
                  {item?.totalFollow.toString().slice(-3) + "K quan tâm"}
                </span>
                <div className="artist__btn-fl">
                  <AddReactionIcon fontSize="small" />
                  <h4>Quan tâm</h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default PlaylistArtistSlide;
