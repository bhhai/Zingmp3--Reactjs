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

HeroSlider.propTypes = {};

SwiperCore.use([Autoplay, Pagination, Navigation]);

function HeroSlider({ slider }) {
  const [heroSlide, setHeroSlide] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await NhacCuaTui.getHome();
      setHeroSlide(response.showcase);
    };

    getData();
  }, []);

  return (
    <Swiper
      spaceBetween={25}
      slidesPerView={3}
      autoplay={{
        delay: 5000,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      {slider.map((item, index) => (
        <SwiperSlide key={index}>
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;
