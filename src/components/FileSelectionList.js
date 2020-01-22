import React from 'react';

export default function FileSelectionList ({events, setActiveEvent}) {

  const eventsList = Object.keys(events).map((event) => {
    return (
      <li 
        key={event}
        onClick={() => setActiveEvent(event)}
      >
        {event}
      </li>
    )
  });

  return (
    <ul id="file-selection-list">
      {eventsList}
    </ul>
  );
}