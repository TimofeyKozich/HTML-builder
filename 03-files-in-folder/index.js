const fs = require('node:fs/promises');
const path = require('node:path');

async function filesInfo(pathToFolder) {
  try {
    const files = await fs.readdir(pathToFolder);

    for (let file of files) {
      const pathToFile = path.join(pathToFolder, file);

      const stats = await fs.stat(pathToFile);
      if(stats.isFile()) {
        const fileName = path.parse(pathToFile).name;
        const fileExtname = path.extname(pathToFile).slice(1);
        const fileSize = stats.size;

        console.log(`${fileName} - ${fileExtname} - ${fileSize}b`);
      }
    }

  } catch (err) {
    console.log(err);
  }
}

filesInfo(path.join(__dirname, 'secret-folder'));
