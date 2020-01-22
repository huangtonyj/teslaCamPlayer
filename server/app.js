const express = require('express');
const app = express();
const port = 3001;
const getFiles = require('./fileSystemAPI');

app.get('/events', (req, res) => {
  // http://localhost:3001/events?dir=/Users/tonyjhuang/tesla_cam_player/TeslaCam
  res.json({
    events: getFiles(req.query.dir)
  });
});

app.get('/videos', (req, res) => {
  // http://localhost:3001/videos?filePath=/Users/tonyjhuang/tesla_cam_player/TeslaCam/SavedClips/2019-07-21_16-48-02/2019-07-21_16-37-36-left_repeater.mp4
  res.sendFile(req.query.filePath);
});

// app.delete('/videos', (req, res) => {
//   console.log(req.query);
//   res.send('delete the 3 to 4 videos from selected event');
// });

// app.post('/videos', (req, res) => {
//   console.log(req.query);
//   res.send('save the 3 to 4 videos from selected event to favories');
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))