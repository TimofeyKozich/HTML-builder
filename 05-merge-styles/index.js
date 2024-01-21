const fs = require('fs');
const path = require('path');

const pathToStylesFolder = path.join(__dirname, 'styles');

const ws = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(pathToStylesFolder, (err, folder) => {
  if (err) {
    console.log(err);
  } else {
    for (let file of folder) {
      const pathToFile = path.join(pathToStylesFolder, file);
      const fileExtname = path.extname(pathToFile);
      if (fileExtname === '.css') {
        const rs = fs.createReadStream(pathToFile, {encoding: 'utf-8'});
        rs.on('data', (chunk) => {
        })
        rs.pipe(ws);

      }
    }
  }
})
