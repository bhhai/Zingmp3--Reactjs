import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import NhacCuaTui from "nhaccuatui-api-full";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./HeroSlider.css";
import LoadingHeroSlide from "./LoadingHeroSlide/LoadingHeroSlide";
import { Link } from "react-router-dom";

HeroSlider.propTypes = {};

SwiperCore.use([Autoplay, Pagination, Navigation]);

function HeroSlider({ slider, loading }) {
  return (
    <Swiper
      className="mobile__nav"
      spaceBetween={25}
      autoplay={{
        delay: 5000,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {loading ? (
        <LoadingHeroSlide />
      ) : (
        slider.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={item.link}>
              <img
                src={item.banner}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "20px",
                }}
              />
            </Link>
          </SwiperSlide>
        ))
      )}
    </Swiper>
  );
}

export default HeroSlider;
