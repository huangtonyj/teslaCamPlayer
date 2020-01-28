import { useState, useEffect } from 'react';
const playBackRateMultiplier = 2;
const skipRate = 3;

export default function useKeyDownHandler() {
  const [mediaControl, setMediaControl] = useState({
    play: true,
    playbackRate: 4,
  });

  useEffect(() => {

    const onKeyDown = ({key}) => {
      const videoFront = document.getElementById('video-front');
      const videoLeftRepeater = document.getElementById('video-left_repeater');
      const videoRightRepeater = document.getElementById('video-right_repeater');
      const videos = [videoFront, videoLeftRepeater, videoRightRepeater];

      switch (key) {
        case " ": {
          if (mediaControl.play) {
            videos.forEach((video) => video.pause());
          } else {
            videos.forEach((video) => video.play());
          }
          setMediaControl({
            ...mediaControl,
            play: !mediaControl.play
          })
          break;
        }

        case ">": {
          const fasterPlaybackRate = Math.min(mediaControl.playbackRate * playBackRateMultiplier, 16);
          videos.forEach((video) => video.playbackRate = fasterPlaybackRate);
          setMediaControl({
            ...mediaControl, 
            playbackRate: fasterPlaybackRate});
          break;
          }

        case "<": {
          const slowerPlaybackRate = Math.max(mediaControl.playbackRate / playBackRateMultiplier, 1);
          videos.forEach((video) => video.playbackRate = slowerPlaybackRate);
          setMediaControl({
            ...mediaControl,
            playbackRate: slowerPlaybackRate
          });
          break;
        }

        case "ArrowRight":{
          const videoFastForwardTime = videoFront.currentTime + skipRate;
          videos.forEach((video) => video.currentTime = videoFastForwardTime);
          break;
          }

        case "ArrowLeft": {
          const videoRewindTime = videoFront.currentTime - skipRate;
          videos.forEach((video) => video.currentTime = videoRewindTime);
          break;
          }

        case "ArrowDown": {
          // select next video
          break;
          }

        default: {
          console.log(key);
          return;
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    
    console.table(mediaControl);
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mediaControl])
}