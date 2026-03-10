import React, { useState, useEffect } from 'react'

function Dur({ duration, playing, playbackRate }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if(playing){
      let val;
      if(playbackRate == 1){
        val = 1000;
      }else if(playbackRate == 1.5){
        val = 700;
      }else if(playbackRate == 2){
        val = 500;
      }
      const interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, val)
      return () => clearInterval(interval)
    }
  }, [timeLeft, playing, playbackRate])

  const date = new Date(timeLeft * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return <div>{hours}:{minutes}:{seconds}</div>
}

export default Dur