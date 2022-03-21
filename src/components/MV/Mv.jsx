import React from "react";
import PropTypes from "prop-types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Mv.css";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import PlayArrow from "@mui/icons-material/PlayArrow";

Mv.propTypes = {};

function Mv({ data, loading }) {
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute <= 9 ? `0${minute}` : minute}:${
      secondLeft <= 9 ? `0${secondLeft}` : secondLeft
    }`;
  }
  return (
    <div className="mv">
      <Swiper
        spaceBetween={25}
        autoplay={{
          delay: 5000,
        }}
        breakpoints={{
          // when window width is >= 640px
          0: { slidesPerView: 1 },
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
              <SwiperSlide key={item.encodeId} className="mv__content">
                <div className="mv__banner">
                  <Link to={item.link}>
                    <img src={item.thumbnailM} alt={item.title} />
                    <div className="mv__overlay"></div>
                    <div className="mv__icon-play">
                      <PlayArrow fontSize="large" />
                    </div>
                    <div className="mv__duration">
                      {formatDuration(item.duration)}
                    </div>
                  </Link>
                </div>
                <div className="mv__title">
                  <div className="mv__title-artist">
                    <img
                      src={item.artists && item.artists[0].thumbnail}
                      alt={""}
                    />
                  </div>
                  <div className="mv__title-name">
                    <Link to={item.link} className="mv__name-song">
                      {item.title}
                    </Link>
                    <div className="mv__artists">
                      {item?.artists.length > 1
                        ? item.artists.map((art, i) => {
                            return (
                              <Link
                                to={art.link}
                                key={art.id}
                                className="artist"
                              >
                                {item?.artists.length - 1 === i
                                  ? art.name + ""
                                  : art.name + ",  "}
                              </Link>
                            );
                          })
                        : item?.artists.map((art, i) => (
                            <Link to={art.link} key={art.id} className="artist">
                              {art.name}
                            </Link>
                          ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}

export default Mv;
