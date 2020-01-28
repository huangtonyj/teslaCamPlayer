import React from 'react';

export default function FileSelectionList ({events, setActiveEvent, activeEvent}) {

  const eventsList = Object.keys(events).map((event) => {
    return (
      <li 
        key={event}
        onClick={() => setActiveEvent(event)}
        className={event === activeEvent ? 'active' : ''}
      >
        {strToDate(event)}
      </li>
    )
  });

  return (
    <ul id="file-selection-list">
      {eventsList}
    </ul>
  );
}

function strToDate(str) {
  const [year, month, day, hour, minute, second] = str.replace('_', '-').split('-');

  return `${month}-${day} .... ${hour}:${minute}`
}