const fs = require('fs');
const path = require('path');

// BFS search the directory
function getFiles(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {
    if (file === '.DS_Store') { return; }

    fileList = fs.statSync(path.join(dir, file)).isDirectory()
      ? getFiles(path.join(dir, file), fileList)
      : fileList.concat({
        path: path.join(dir, file),
        file,
        event: file.slice(0, 19)
      });
  });

  return fileList;
}

module.exports = getFiles;