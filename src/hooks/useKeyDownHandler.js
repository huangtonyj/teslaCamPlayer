import { useState, useEffect } from 'react';

export default function useKeyDownHandler() {
  const [mediaControl, setMediaControl] = useState({
    play: true,
    playbackRate: 1,
  });

  useEffect(() => {

    const onKeyDown = ({key}) => {
      const videoFront = document.getElementById('video-front');
      const videoLeftRepeater = document.getElementById('video-left_repeater');
      const videoRightRepeater = document.getElementById('video-right_repeater');
      const videos = [videoFront, videoLeftRepeater, videoRightRepeater];

      switch (key) {
        case " ":
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

        case ">":
          const fasterPlaybackRate = Math.min(mediaControl.playbackRate * 2, 16);
          videos.forEach((video) => video.playbackRate = fasterPlaybackRate);
          setMediaControl({
            ...mediaControl, 
            playbackRate: fasterPlaybackRate});
          break;

        case "<":
          const slowerPlaybackRate = Math.max(mediaControl.playbackRate / 2, 1);
          videos.forEach((video) => video.playbackRate = slowerPlaybackRate);
          setMediaControl({
            ...mediaControl,
            playbackRate: slowerPlaybackRate
          });
          break;

        default:
          console.log(key);
          return;
      }
    }

    document.addEventListener('keydown', onKeyDown)
    
    console.table(mediaControl);
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mediaControl])
}