import React from 'react'
const videoAPIEndpoint = "http://localhost:3001/videos?filePath=";
 
export default function Video({angle, filePath, onEndedCallback}) {
  if (!filePath) { return null; }

  return (
    <video 
      id={`video-${angle}`}
      controls=""
      autoPlay
      name="media"
      src={`${videoAPIEndpoint}${filePath[angle]}`}
      type="video/mp4"
      onEnded={onEndedCallback}
    />
  );

}