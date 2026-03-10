import React, { useState, useRef, useEffect } from "react";
import { findDOMNode } from 'react-dom'
import videojs from "video.js";
import "video.js/dist/video-js.css";
import styles from "./videoplayer.module.css";
import videoImg from "../../Assets/Videos/videoImg.png";
import ReactPlayer from 'react-player';
import { useNavigate, useLocation } from "react-router-dom";
import { Button, duration } from "@mui/material";
import screenfull from 'screenfull'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Duration from "./Duration";
import { SatelliteAlt } from "@mui/icons-material";
import Dur from "./Dur";

const CustomVideoPlayer = (props) => {
  const location = useLocation();
  const { title, encoded_video, file } = location.state;
  const [time, setTime] = useState(0);
  const playerRef = useRef(null);
  let navigate = useNavigate();


  const [currentTime, setCurrentTime] = useState(0);

  // useEffect(() => {
  //   getcurrent();
  // }, [encoded_video]);

  const getcurrent = () => {
    setInterval(() => {
      // setCurrentTime(playerRef?.current?.getCurrentTime());
    }, 1000);
  }

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      console.log("hi")
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        console.log("done hi")
      });
    }
  }, [])

  const getBackToPrevious = () => {
    navigate(`/dashboard/content/videos/videoslist`)
  }

console.log(title, encoded_video, file, "nwtydysbdwyefdtvdwgcdwd62572632");
  return (
    <>
      {/* use encoded_video*/}
      <div className={styles.topicData}>
        <ArrowBackIosNewIcon className={styles.arrows} onClick={() => getBackToPrevious()} />
        <div>{title}</div>
      </div>
      {/* {time} */}
      <ReactPlayer
        controls={true}
        ref={player => { playerRef.current = player }}
        config={{
          file:{
            attributes:{
              controlsList: 'nodownload',
            }
          }
        }} 
        url={file}
        // url="https://prod-api.brainhap.com/files/media/videos/2023/09/01/sample.mp4"
        width="90%"
        height="70%"
        style={{ margin: '0 auto' }}
      />
    </>
  );
};

export default CustomVideoPlayer;

const boardArray = [
  { id: 1, title: "ICSC" },
  { id: 2, title: "CBSC" },
  { id: 3, title: "International" },
];

const values = [
  {
    id: 1,
    title: "Physics",
    //   icons: Physics,
    bgColor: "#C204FB",
    bgColor1: "#7900FF",
  },
  {
    id: 2,
    title: "Chemistry",
    //   icons: Chemistry,
    bgColor: "#4AB1F9",
    bgColor1: "#1877E5",
  },
  {
    id: 3,
    title: "Biology",
    //   icons: Biology,
    bgColor: "#FC6A71",
    bgColor1: "#F5377D",
  },
  {
    id: 4,
    title: "Maths",
    //   icons: Maths,
    bgColor: "#60D66B",
    bgColor1: "#45A735",
  },
  {
    id: 5,
    title: "Chemistry",
    //   icons: Chemistry,
    bgColor: "#4AB1F9",
    bgColor1: "#1877E5",
  },
  {
    id: 6,
    title: "Biology",
    //   icons: Biology,
    bgColor: "#FC6A71",
    bgColor1: "#F5377D",
  },
  {
    id: 7,
    title: "Maths",
    //   icons: Maths,
    bgColor: "#60D66B",
    bgColor1: "#45A735",
  },
];

const gradeList = [
  {
    id: 1,
    title: "Grade VI",
    color: "#FB7D5B",
  },
  {
    id: 2,
    title: "Grade VII",
    color: "#FB7D5B",
  },
  {
    id: 1,
    title: "Grade VIII",
    color: "#4CBC9A",
  },
  {
    id: 1,
    title: "Grade IX",
    color: "#303972",
  },
  {
    id: 1,
    title: "Grade X",
    color: "#FCC43E",
  },
];
