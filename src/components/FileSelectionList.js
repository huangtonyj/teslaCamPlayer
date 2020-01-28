import React from 'react';

export default function FileSelectionList ({events, setActiveEvent, activeEvent}) {

  const eventsList = Object.keys(events).map((event) => {
    return (
      <li 
        key={event}
        onClick={() => setActiveEvent(event)}
        className={event === activeEvent ? 'active' : ''}
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