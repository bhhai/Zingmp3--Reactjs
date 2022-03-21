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
import { Popover, Typography } from "@mui/material";
import TopicSlide from "../../../components/TopicSlide/TopicSlide";

PlaylistArtistSlide.propTypes = {};

SwiperCore.use([Pagination, Autoplay]);

function PlaylistArtistSlide({ data }) {
  const [artistAlias, setAstistAlias] = useState(null);
  const [artistInfo, setArtistInfo] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const swiperRef = useRef(null);

  useEffect(() => {
    const getArtist = async () => {
      const { data } = await musicApi.getArtist(artistAlias);

      setArtistInfo(data);
    };

    getArtist();
  }, [artistAlias]);

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
                <Typography
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                >
                  <Link
                    to={item.link}
                    id="artist__hover"
                    onMouseOver={() => setAstistAlias(item.alias)}
                  >
                    <h4 className="artist__name artist__btn">{item.name}</h4>
                  </Link>
                </Typography>
                {artistInfo && (
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: "none",
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                  >
                    <div className="modal__hover">
                      <div className="modal__name">
                        <div className="modal__name-content">
                          <div className="modal__thumb">
                            <img src={artistInfo?.thumbnail} alt="" />
                          </div>
                          <div className="modal__title">
                            <span className="modal__title-name">
                              {artistInfo?.name}
                            </span>
                            <span className="modal__follow">
                              {artistInfo?.totalFollow.toString().slice(0, 3) +
                                "K quan tâm"}
                            </span>
                          </div>
                        </div>
                        <div
                          className="artist__btn-fl"
                          style={{ padding: "3px 6px", margin: 0 }}
                        >
                          <AddReactionIcon fontSize="small" />
                          <h4>Quan tâm</h4>
                        </div>
                      </div>
                      <div className="modal__album">
                        <p>Mới nhất</p>
                        {artistInfo?.topAlbum && (
                          <div
                            className="modal__single"
                            key={artistInfo?.topAlbum.encodeId}
                          >
                            <div className="thumb">
                              <img
                                src={artistInfo?.topAlbum.thumbnail}
                                alt=""
                              />
                            </div>
                            <p>{artistInfo?.topAlbum.title}</p>
                            <span>{artistInfo?.topAlbum.releaseDateText}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Popover>
                )}

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
