import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FileSelectionList from './components/FileSelectionList';
import Video from './components/Video';

export default function App() {

  const [events, setEvents] = useState({});

  useEffect((dir) => {
    dir = '/Users/tonyjhuang/tesla_cam_player/TeslaCam';

    async function fetchEvents() {
      const result = await axios(`http://localhost:3001/events?dir=${dir}`)
      setEvents(result.data);
    }

    fetchEvents();
  }, []);

  const [activeEvent, setActiveEvent] = useState(); 

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
          setMediaControl({...mediaControl, play: !mediaControl.play})
          break;

        case ">":
          const playbackRate = Math.min(mediaControl.playbackRate * 2, 16);
          videos.forEach((video) => video.playbackRate = playbackRate);
          setMediaControl({...mediaControl, playbackRate})
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

  return (
    <div id="app">

      <FileSelectionList
        events={events}
        setActiveEvent={setActiveEvent}
      />

      <div id="video-container">
        <Video
          angle="front"
          filePath={events[activeEvent]}
        />

        <div id="side-angle-video-container">
          <Video
            angle="left_repeater"
            filePath={events[activeEvent]}
          />

          <Video
            angle="right_repeater"
            filePath={events[activeEvent]}
          />
        </div>
      </div>

    </div>
  );
}