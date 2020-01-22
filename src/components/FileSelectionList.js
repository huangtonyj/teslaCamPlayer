import React from 'react';

export default function FileSelectionList ({events}) {
  
  const eventsList = Object.keys(events).map((event) => {
    return (
      <li>
        {event}
      </li>
    )
  });

  return (
    <ul>
      {eventsList}
    </ul>
  );
}