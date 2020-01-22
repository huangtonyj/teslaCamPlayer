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