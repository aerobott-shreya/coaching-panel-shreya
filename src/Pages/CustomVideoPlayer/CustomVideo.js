import React, { useEffect, useRef } from 'react'
import styles from "./videoplayer.module.css";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ReactHlsPlayer from 'react-hls-player';
import { useNavigate, useLocation } from "react-router-dom";



function CustomVideo() {
    const location = useLocation();
    const playerRef = useRef(null);
    let navigate = useNavigate();
    const { topic, encoded_video } = location.state;

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         console.log(playerRef);
    //     }, 10000);

    //     return () => clearInterval(intervalId);
    // }, []);


    const getBackToPrevious = () => {
        navigate(`/dashboard/content/videos/videoslist`)
    }

    return (
        <div>
            <div className={styles.topicData}>
                <ArrowBackIosNewIcon className={styles.arrows} onClick={() => getBackToPrevious()} />
                <div>{topic}</div>
            </div>
            <ReactHlsPlayer
                ref={playerRef}
                // src="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                src={encoded_video}
                autoPlay={false}
                controls={true}
                width="100%"
                height="auto"
            />
        </div>
    )
}

export default CustomVideo