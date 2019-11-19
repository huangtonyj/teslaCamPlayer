const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

app.get('/events', (req, res) => {
  const rootDirectory = req.query.dir;

  const eventsSet = new Set();

  fs.readdirSync(rootDirectory).forEach((file) => {
    eventsSet.add(file.slice(0, 19));
  })

  res.json({
    events: Array.from(eventsSet)
  });

});

app.get('/videos', (req, res) => {
  // res.send('get the 3 to 4 videos from selected event');
  console.log(req.query);
  const testFile = '/Users/tonyjhuang/tesla_cam_player/TeslaCam/SavedClips/2019-07-21_16-48-02/2019-07-21_16-37-36-front.mp4';
  res.sendFile(testFile);
});

app.delete('/videos', (req, res) => {
  console.log(req.query);
  res.send('delete the 3 to 4 videos from selected event');
});

app.post('/videos', (req, res) => {
  console.log(req.query);
  res.send('save the 3 to 4 videos from selected event to favories');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))