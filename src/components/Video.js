import React from 'react'
 
export default function Video({angle, videoAPIEndpoint, filePath}) {
  if (!filePath) { return null; }

  console.log(`${videoAPIEndpoint}${filePath[angle]}`)

  return (
    <div>
      {angle}
      <video 
        controls="" 
        width="320"
        height="240"
        autoPlay
        name="media"
        src = {`${videoAPIEndpoint}${filePath[angle]}`}
        type = "video/mp4"
      />
    </div>
  );

}