import React from "react";
import PropTypes from "prop-types";
import CodeIcon from "@mui/icons-material/Code";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import BarChartIcon from "@mui/icons-material/BarChart";
import "./LeftBar.css";

import { Link, NavLink } from "react-router-dom";

LeftBar.propTypes = {};

function LeftBar(props) {
  return (
    <div className="left">
      <div className="left__logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/24/ZingMP3logo.svg"
          alt=""
        />
      </div>
      <div className="left__menu">
        <NavLink to="/search" className="menu__item">
          <SearchIcon />
          <span>Tìm kiếm</span>
        </NavLink>
        <NavLink to="/" className="menu__item">
          <HomeIcon />
          <span>Trang chủ</span>
        </NavLink>
        <NavLink to="/kham-pha" className="menu__item">
          <ExploreIcon />
          <span>Khám phá</span>
        </NavLink>
        <NavLink to="/chart" className="menu__item">
          <BarChartIcon />
          <span>BXH</span>
        </NavLink>
      </div>
    </div>
  );
}

export default LeftBar;
