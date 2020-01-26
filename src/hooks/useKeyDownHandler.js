import { useState, useEffect } from 'react';

export default function useKeyDownHandler() {
  const [mediaControl, setMediaControl] = useState({
    play: true,
    playbackRate: 1,
  });

  useEffect(() => {

    const onKeyDown = ({
      key
    }) => {
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
          const playbackRate = Math.min(mediaControl.playbackRate * 2, 16);
          videos.forEach((video) => video.playbackRate = playbackRate);
          setMediaControl({
            ...mediaControl,
            playbackRate
          })
          break;

        default:
          // console.log(key);
          return;
      }
    }

    document.addEventListener('keydown', onKeyDown)


    console.log(mediaControl);

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [mediaControl])
}