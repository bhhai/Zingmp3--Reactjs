import { Skeleton } from "@mui/material";
import React from "react";
import TopicCard from "../TopicCard/TopicCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "./TopicSlide.css";

TopicSlide.propTypes = {};

function TopicSlide({ data, loading }) {
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
        {loading
          ? Array.from(new Array(8)).map((x, i) => (
              <SwiperSlide key={i}>
                <div key={i} className="topic">
                  <div className="topic__thumbnail">
                    <Skeleton
                      variant="rectangular"
                      height="215px"
                      width="100%"
                    />
                  </div>
                  <div className="topic__title" style={{ margin: "10px 0" }}>
                    <Skeleton animation="wave" height="20px" width="50%" />
                  </div>
                  <span className="topic__description">
                    <Skeleton animation="wave" height="14px" width="100%" />
                    <Skeleton
                      animation="wave"
                      height="14px"
                      width={`${Math.random() * 100}%`}
                    />
                  </span>
                </div>
              </SwiperSlide>
            ))
          : data &&
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
                  loading={loading}
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
