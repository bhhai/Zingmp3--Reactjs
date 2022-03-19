import React from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

SongFeatureSlide.propTypes = {};

function SongFeatureSlide({ data }) {
  return (
    <>
      <Swiper
        spaceBetween={25}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          // when window width is >= 640px
          0: { slidesPerView: 1 },
          640: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <Link to={item.link}>
                <img
                  style={{ borderRadius: "10px" }}
                  src={item.thumbnailM}
                  alt=""
                />
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default SongFeatureSlide;
