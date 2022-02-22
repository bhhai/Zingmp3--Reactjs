import React from "react";
import PropTypes from "prop-types";
import "./SongDetail.css";

SongDetail.propTypes = {};

function SongDetail(props) {
  return (
    <div>
      Song Detail
      <audio
        controls
        src="https://vnno-vn-5-tf-mp3-s1-zmp3.zadn.vn/e0d14f0eb7495e170758/8907696277608557017?authen=exp=1645196603~acl=/e0d14f0eb7495e170758/*~hmac=c4cfb9b0dd13c9d61db9e5f8a2143e0a&fs=MTY0NTAyMzgwMzU5MHx3ZWJWNnwwfDExMy4xNzIdUngMjMzLjEyMA"
      ></audio>
    </div>
  );
}

export default SongDetail;
