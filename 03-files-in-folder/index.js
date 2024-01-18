const fs = require('fs');
const path = require('path');

const pathToSecretFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToSecretFolder, (err, files) => {
  if (err) {
    console.log(err);

  } else {
    for (let file of files) {
      fs.stat(path.join(__dirname, 'secret-folder', file), (err, fileStats) => {
        if (err) {
          console.log(err);

        } else {
          if (fileStats.isFile()) {
            const pathToFile = path.join(pathToSecretFolder, file);

            const fileName = path.parse(pathToFile).name;
            const fileExtname = path.extname(pathToFile).slice(1);
            const fileSize = fileStats.size;
      
            console.log(`${fileName} - ${fileExtname} - ${fileSize}`);

          }
        }
      })
    }
  }
})