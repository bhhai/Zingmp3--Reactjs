import React from "react";
import PropTypes from "prop-types";
import "./HomeEvent.css";
import OutLineButton from "../Button/OutLineButton";
import MainButton from "../Button/MainButton";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import NhacCuaTui from "nhaccuatui-api-full";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

HomeEvent.propTypes = {};

function HomeEvent({ data }) {
  return (
    <Swiper
      spaceBetween={25}
      slidesPerView={3}
      autoplay={{
        delay: 5000,
      }}
      className="home-event"
    >
      {data.items.map((item, i) => (
        <SwiperSlide className="home-event__item" key={item.encodeId}>
          <div className="home-event__thumbnail">
            <div className="thumbnail-overlay"></div>
            <img src={item.coverH} alt={item.title} />
            <div className="home-event__title">
              <span className="home-event__tags">{item.label}</span>
              <h4 className="home-event__tit">{item.title}</h4>
              <span className="home-event__address">{item.address}</span>
            </div>
          </div>
          <div className="home-event__follow">
            <div className="followers">
              <span>Lượt quan tâm</span>
              <div className="followers__avt">
                {item.followers.map((follower, i) => (
                  <img
                    key={follower.id}
                    src={follower.avatar}
                    alt=""
                    className="follower__image"
                  />
                ))}
                <span>
                  <span>+</span>
                  {item.totalFollow - item.followers.length}
                </span>
              </div>
            </div>
            <div className="follow__btn">
              <MainButton title={item.subscribeText} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HomeEvent;
