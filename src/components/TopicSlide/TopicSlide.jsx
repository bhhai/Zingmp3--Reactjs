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

import "./TopicSlide.css";
import TopicCard from "../TopicCard/TopicCard";

TopicSlide.propTypes = {};

function TopicSlide({ data }) {
  return (
    <div>
      <Swiper
        spaceBetween={25}
        slidesPerView={5}
        autoplay={{
          delay: 5000,
        }}
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <TopicCard src={item.thumbnail} title={item.title} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default TopicSlide;
