import { Timelapse } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'

function Duration({ duration, setTimeStart = () => {}, seconds,  playing, playbackRate }) {
  // const [timeLeft, setTimeLeft] = useState(duration)

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
      if(duration !== seconds){
        const interval = setInterval(() => {
          console.log(duration, "TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
          setTimeStart(duration + 1)
        }, val)

        window.addEventListener("beforeunload", getAnswer);
        window.addEventListener("onload", getAnswer);

        return () => {
          // alert("hi");
        window.removeEventListener("beforeunload", getAnswer);

        window.removeEventListener("onload", getAnswer);
          clearInterval(interval)}
      }
      
    }
  }, [duration, playing, playbackRate])


  const getAnswer = () => {
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDdd")
  }


  const date = new Date(duration * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const sec = date.getUTCSeconds();

  return <div>{hours}:{minutes}:{sec}</div>
}

export default Duration

// export default function Duration ({ className, seconds }) {
//     console.log(className,seconds,'duration')
//   return (
//     <time dateTime={`P${Math.round(seconds)}S`} className={className}>
//       {format(seconds)}
//     </time>
//   )
// }

// function format (seconds) {
//   const date = new Date(seconds * 1000)
//   const hh = date.getUTCHours()
//   const mm = date.getUTCMinutes()
//   const ss = pad(date.getUTCSeconds())
//   if (hh) {
//     return `${hh}:${pad(mm)}:${ss}`
//   }
//   return `${mm}:${ss}`
// }

// function pad (string) {
//   return ('0' + string).slice(-2)
// }


var checkDate = 0; // when showing counter value will be zero and when showing countdown value will be eg 23303030

// Update the count down every 1 second
// var x = setInterval(function () {
//   var countDownDate = new Date(checkDate).getTime();


//   // Get today's date and time
//   var now = new Date(null).getTime();

//   // Find the distance between now and the count down date
//   var distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Output the result in an element with id="demo"
//  console.log(hours,minutes,seconds)
//   checkDate = checkDate + 1000
//   // If the count down is over, write some text 
//   if (distance < 0) {
//     clearInterval(x);
//     document.getElementById("demo").innerHTML = "EXPIRED";
//   }
// }, 1000);


/**
 * 
 * 1 - Create custom hooks 
 *     - Take 3 parameters 
 *        1 - Base time (0 or else 1311100 miliseconds)
 *        2 - Time ellapsed ( 0,1, 2,3,4)
 *        3 - countdown time (string) (if counter then plus and countdown means minuse)
 * 
 *        hour minute second  millisecond
 *   
*/