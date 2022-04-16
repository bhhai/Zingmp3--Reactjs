import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import TopicIcon from "@mui/icons-material/Topic";
import UploadIcon from "@mui/icons-material/Upload";
import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

Header.propTypes = {};

function Header(props) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const headerScroll = () => {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("myHeader").style.backgroundColor = "#170f23";
    } else {
      document.getElementById("myHeader").style.backgroundColor = "transparent";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerScroll);
  });

  const handle = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    navigate(`/tim-kiem/query=${search}`);
  };
  return (
    <div className="header" id="myHeader">
      <div className="header-container">
        <div className="header__left">
          <div className="header__bar">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
          <form
            className="header__search"
            onSubmit={(e) => handleSearchSubmit(e)}
          >
            <input
              type="text"
              placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
              onChange={(e) => handle(e)}
            />
            <SearchIcon className="search-icon" />
          </form>
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
