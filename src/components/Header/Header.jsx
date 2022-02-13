import React from "react";
import PropTypes from "prop-types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Header.css";
import { IconButton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import SettingsIcon from "@mui/icons-material/Settings";
import TopicIcon from "@mui/icons-material/Topic";
import SearchIcon from "@mui/icons-material/Search";

Header.propTypes = {};

function Header(props) {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header__left">
          <div className="header__bar">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
          <div className="header__search">
            <input
              type="text"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
            />
            <SearchIcon className="search-icon" />
          </div>
        </div>
        <div className="header__right">
          <IconButton>
            <div className="header__right-item">
              <TopicIcon />
            </div>
          </IconButton>
          <IconButton>
            <div className="header__right-item">
              <SettingsIcon />
            </div>
          </IconButton>
          <IconButton>
            <div className="header__right-item">
              <UploadIcon />
            </div>
          </IconButton>
          <IconButton>
            <div className="header__right-item">
              <AccountCircleIcon />
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
