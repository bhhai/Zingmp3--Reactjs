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
import LazyLoad from "react-lazyload";
import Loading from "../Loading/Loading";

TopicSlide.propTypes = {};

function TopicSlide({ data }) {
  return (
    <div>
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
            slidesPerView: 5,
          },
        }}
      >
        {data &&
          data.map((item, index) => (
            <SwiperSlide key={index}>
              <TopicCard
                src={item.thumbnailM || item.thumbnail || item.thumbURL}
                title={item.title}
                playlistKey={item.encodeId}
                description={
                  item.sortDescription ||
                  item.releaseDate ||
                  item.activeUsers + " đang nghe"
                }
                link={item.link}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export const ZingChoiceSlide = ({ data }) => {
  return (
    <div className="zing-choice">
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
            slidesPerView: 5,
          },
        }}
      >
        {data.map((item, i) => (
          <SwiperSlide key={item.encodeId}>
            <TopicCard
              src={item.thumbnail || item.thumbURL}
              title={item.title}
              playlistKey={item.encodeId}
              description={""}
              link={item.link}
              release={item.releaseDate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopicSlide;
