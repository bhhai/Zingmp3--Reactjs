import FitScreenIcon from "@mui/icons-material/FitScreen";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { Slider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import musicApi from "../../api/musicApi";
import {
  setNextSong,
  setPlayingPlaylist,
} from "../../feature/ZingChartPage/musicSlice";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RepeatIcon from "@mui/icons-material/Repeat";
import "./Player.css";
import PlayerCenter from "./PlayerCenter/PlayerCenter";

Player.propTypes = {};

function Player({ id }) {
  const audioEl = useRef(null);

  const dispatch = useDispatch();

  const playingSong = useSelector((state) => state.music.playingSong);
  const playingPlaylist = useSelector((state) => state.music.playingPlaylist);

  const [listSong, setListSong] = useState([]);
  const [song, setSong] = useState();
  const [infoSong, setInfoSong] = useState();

  const [value, setValue] = useState(60);
  const [currentSongIndex, setCurrentSongIndex] = useState();
  const [nextSongIndex, setNextSongIndex] = useState();
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const getSong = async () => {
      try {
        const response = await musicApi.getSong(playingSong);
        const getInfo = await musicApi.getInfoSong(playingSong);
        const list = await musicApi.getCharthome();

        setSong(response.data);
        setInfoSong(getInfo.data);
        setListSong(list.data.RTChart.items);

        if (song) {
          audioEl.current.play();
        }

        setLoading(false);
      } catch (error) {}
    };
    getSong();
  }, [playingSong, nextSongIndex]);

  useEffect(() => {
    const next = () => {
      setNextSong(currentSongIndex);
    };
    next();
  }, [currentSongIndex]);

  // useEffect(() => {
  //   setNextSongIndex(() => {
  //     if (currentSongIndex + 1 > listSong.length - 1) {
  //       return 0;
  //     } else {
  //       return currentSongIndex + 1;
  //     }
  //   });
  // }, [currentSongIndex]);

  const handleNextSong = () => {
    const currentIndex = playingPlaylist.findIndex(
      (song) => song.encodeId === playingSong
    );

    setNextSong(currentIndex + 1);
    setNextSongIndex(currentIndex + 1);
  };

  if (playingSong.length <= 0) {
    return (
      <div className="player">
        <div>Chua chon bai hat</div>
      </div>
    );
  }
  return (
    <>
      {console.log("re- render")}
      <div className="player">
        <div className="player__left">
          <audio src={song && song[Object.keys(song)[0]]} ref={audioEl}></audio>
          <div className="left__thumb">
            <img src={infoSong?.thumbnail} alt={infoSong?.title} />
          </div>
          <div className="left__title">
            <h4 className="left__name">{infoSong?.title}</h4>
            <div className="left__artist">
              {infoSong?.artists.length > 1
                ? infoSong?.artists.map((item, i) => {
                    let len = infoSong?.artists.length;
                    return (
                      <Link
                        to={item.link}
                        key={item.artistId}
                        className="artist"
                      >
                        {len - 1 === i ? item.name + "" : item.name + ",  "}
                      </Link>
                    );
                  })
                : infoSong?.artists.map((item, i) => (
                    <Link to={item.link} key={item.artistId} className="artist">
                      {item.name}
                    </Link>
                  ))}
            </div>
          </div>
          <div className="left__nav"></div>
        </div>
        <div className="player__center">
          <div className="center__control">
            <div className="center__btn">
              <div className="center__control-item">
                <ShuffleIcon />
              </div>
              <div className="center__control-item">
                <SkipPreviousIcon />
              </div>
              <div className="center__control-item mid-play">
                <PlayArrowIcon />
              </div>
              <div className="center__control-item" onClick={handleNextSong}>
                <SkipNextIcon />
              </div>
              <div className="center__control-item">
                <RepeatIcon />
              </div>
            </div>
            <div className="center__slider"></div>
          </div>
        </div>
        <div className="player__right">
          <div className="player__right-icon">
            <MusicVideoIcon />
          </div>
          <div className="player__right-icon">
            <MicExternalOnIcon />
          </div>
          <div className="player__right-icon">
            <FitScreenIcon />
          </div>
          <div className="player__right-icon volumn">
            <VolumeUp style={{ marginRight: "5px" }} />
            <Slider aria-label="Volume" value={value} onChange={handleChange} />
          </div>
          <div className="player__right-icon">
            <QueueMusicIcon />
          </div>
        </div>
      </div>
    </>
  );
}

export default Player;
