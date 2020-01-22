const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = {}) {
  fs.readdirSync(dir).forEach(file => {
    if (file === '.DS_Store') { return; }

    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      return getFiles(path.join(dir, file), fileList)
    } else {
      const event = file.slice(0, 19);
      const cam = file.slice(20, file.length - 4);
      
      if (!fileList[event]) {
        fileList[event] = {}
      }

      fileList[event][cam] = path.join(dir, file);
    }
  });

  return fileList;
}

module.exports = getFiles;