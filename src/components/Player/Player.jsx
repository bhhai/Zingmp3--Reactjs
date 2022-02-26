import FitScreenIcon from "@mui/icons-material/FitScreen";
import MicExternalOnIcon from "@mui/icons-material/MicExternalOn";
import MusicVideoIcon from "@mui/icons-material/MusicVideo";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import VolumeUp from "@mui/icons-material/VolumeUp";
import PauseIcon from "@mui/icons-material/Pause";
import { Slider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import musicApi from "../../api/musicApi";
import {
  setNextSong,
  setPlayingSong,
  setPrevSong,
} from "../../feature/ZingChartPage/musicSlice";
import "./Player.css";

Player.propTypes = {};

function Player({ id }) {
  const dispatch = useDispatch();

  const playingSong = useSelector((state) => state.music.playingSong);
  const playingPlaylist = useSelector((state) => state.music.playingPlaylist);

  const [listSong, setListSong] = useState([]);
  const [song, setSong] = useState();
  const [infoSong, setInfoSong] = useState();

  const [valueVolume, setValueVolume] = useState(60);
  const [nextSongId, setNextSongId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [position, setPosition] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  const audio = useRef(null);
  const timeCurrent = useRef(null);
  const timeProgress = useRef(null);
  const timeDuration = useRef(null);
  const volumeProgress = useRef(null);

  const playBtn = useRef(null);
  const randomBtn = useRef(null);
  const repeatBtn = useRef(null);

  useEffect(() => {
    const getSong = async () => {
      try {
        const response = await musicApi.getSong(playingSong);
        const getInfo = await musicApi.getInfoSong(playingSong);
        const list = await musicApi.getCharthome();

        setSong(response.data);
        setInfoSong(getInfo.data);
        setListSong(list.data.RTChart.items);

        setLoading(false);
      } catch (error) {}
    };
    getSong();
  }, [playingSong]);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
  });

  const handle = {
    isPlaying: isPlaying,
    isRandom: isRandom,
    isRepeat: isRepeat,
    handleEvent() {
      // Khi thời gian update
      audio.current.ontimeupdate = () => {
        if (audio.current.duration) {
          const progressPercent = Math.floor(
            (audio.current.currentTime / audio.current.duration) * 100
          );
          const minutes = Math.floor(audio.current.currentTime / 60);
          const seconds = Math.floor(audio.current.currentTime - minutes * 60);
          timeProgress.current.value = progressPercent;
          timeCurrent.current.innerHTML = `0${minutes}:${
            seconds >= 10 ? seconds : "0" + seconds
          }`;
        }
      };

      // Khi tua
      timeProgress.current.oninput = (e) => {
        const seekTime = (e.target.value / 100) * audio.current.duration;
        audio.current.currentTime = seekTime;
      };
      // Khi endSong
      audio.current.onended = () => {
        if (this.isRepeat) {
          audio.current.play();
        } else {
          if (isRandom) {
            this.randomSong();
          } else {
            dispatch(setNextSong());
          }
        }
      };
      // Khi thay doi volume
      volumeProgress.current.oninput = (e) => {
        const seekVolume = e.target.value / 100;
        setValueVolume(seekVolume * 100);
        audio.current.volume = seekVolume;
      };
      // Khi isRepeat
      if (this.isRepeat) {
        repeatBtn.current.childNodes[0].classList.add("main-color");
      } else {
        repeatBtn.current.childNodes[0].classList.remove("main-color");
      }
      // Khi isRandom
      if (this.isRandom) {
        randomBtn.current.childNodes[0].classList.add("main-color");
      } else {
        randomBtn.current.childNodes[0].classList.remove("main-color");
      }
    },
    randomSong() {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * playingPlaylist.length);
      } while (playingPlaylist[newIndex].encodeId === playingSong.encodeId);
      dispatch(setPlayingSong(playingPlaylist[newIndex].encodeId));
    },
    start() {
      this.handleEvent();
    },
  };

  useEffect(() => {
    handle.start();
    console.log(handle.isPlaying);
  }, [
    playingPlaylist.length,
    playingSong,
    handle.isRepeat,
    handle.isRandom,
    handle,
  ]);

  const handleChange = (event, newValue) => {
    setValueVolume(newValue);
  };

  const handleNextSong = () => {
    dispatch(setNextSong());
    setNextSongId(nextSongId);
  };

  const handlePrevSong = () => {
    dispatch(setPrevSong());
    setNextSongId(nextSongId);
  };

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute <= 9 ? `0${minute}` : minute}:${
      secondLeft <= 9 ? `0${secondLeft}` : secondLeft
    }`;
  }

  return (
    <>
      <div className={`player ${playingSong ? "" : "hidden"}`}>
        <div className="player__left">
          <audio
            src={song && song[Object.keys(song)[0]]}
            ref={audio}
            autoPlay
          ></audio>
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
              <div
                className={`center__control-item ${
                  isRandom ? "main-color" : ""
                }`}
                ref={randomBtn}
                onClick={() => setIsRandom(!isRandom)}
              >
                <ShuffleIcon />
              </div>
              <div className="center__control-item" onClick={handlePrevSong}>
                <SkipPreviousIcon />
              </div>
              <div
                className="center__control-item mid-play"
                ref={playBtn}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </div>
              <div className="center__control-item" onClick={handleNextSong}>
                <SkipNextIcon />
              </div>
              <div
                className={`center__control-item ${
                  isRepeat ? "main-color" : ""
                }`}
                ref={repeatBtn}
                onClick={() => setIsRepeat(!isRepeat)}
              >
                <RepeatIcon />
              </div>
            </div>
            <div className="center__slider">
              <span
                className="center__time center__time-left"
                ref={timeCurrent}
              >
                {formatDuration(position)}
              </span>
              <div className="music-player-controls__time__progress">
                <input type="range" min="0" max="100" ref={timeProgress} />
              </div>
              <span
                className="center__time center__time-right"
                ref={timeDuration}
              >
                {formatDuration(infoSong?.duration)}
              </span>
            </div>
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
            <Slider
              aria-label="Volume"
              value={valueVolume}
              onChange={handleChange}
              ref={volumeProgress}
            />
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
