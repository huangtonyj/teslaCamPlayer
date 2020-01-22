import React from 'react'
const videoAPIEndpoint = "http://localhost:3001/videos?filePath=";
 
export default function Video({angle, filePath}) {
  if (!filePath) { return null; }

  // console.log(`${videoAPIEndpoint}${filePath[angle]}`)

  return (
      <video 
        id={`video-${angle}`}
        controls=""
        autoPlay
        name="media"
        src = {`${videoAPIEndpoint}${filePath[angle]}`}
        type = "video/mp4"
      />
    
  );

}