const fs = require('node:fs');
const path = require('node:path');

const pathToFolder = path.join(__dirname, 'files');
const pathToFolderCopy = path.join(__dirname, 'files-copy');

fs.mkdir(pathToFolderCopy, { recursive: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    fs.readdir(pathToFolder, (err, filesInFolder) => {
      if (err) {
        console.log(err);
      } else {
        for (let file of filesInFolder) {
        const pathToFile = path.join(pathToFolder, file);
        const pathToFileCopy = path.join(pathToFolderCopy, file);

        fs.copyFile(pathToFile, pathToFileCopy,  fs.constants.COPYFILE_FICLONE, (err) => {
          if (err) {
            console.log(err);
          }
        })
        
        }
      }
    })
  }
})