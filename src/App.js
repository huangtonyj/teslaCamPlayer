import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import FileSelectionList from './components/FileSelectionList';
import Video from './components/Video';
import useKeyDownHandler from './hooks/useKeyDownHandler';

export default function App() {

  const [events, setEvents] = useState({});

  useEffect((dir) => {
    dir = '/Users/tonyjhuang/tesla_cam_player/TeslaCam';

    async function fetchEvents() {
      const result = await axios(`http://localhost:3001/events?dir=${dir}`)
      let current = null;

      // Chain events to add ability to skip to next video
      Object.entries(result.data).forEach(([key, val]) => {
        val.event = key;
        val.prev = current;
        val.next = null;
        if (current) { val.prev.next = result.data[key]; }
        current = result.data[key];
      })

      setEvents(result.data);
    }

    fetchEvents();
  }, []);

  const [activeEvent, setActiveEvent] = useState(); 

  const [mediaControl, setMediaControl] = useState({
    play: true,
    playbackRate: 16,
  });

  useKeyDownHandler({mediaControl, setMediaControl})
  
  return (
    <div id="app">

      <FileSelectionList
        events={events}
        setActiveEvent={setActiveEvent}
        activeEvent={activeEvent}
      />

      <div id="video-container">
        <h2>{activeEvent}</h2>

        <Video
          angle="front"
          filePath={events[activeEvent]}
          onEndedCallback={() => setActiveEvent(events[activeEvent].next.event)}
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