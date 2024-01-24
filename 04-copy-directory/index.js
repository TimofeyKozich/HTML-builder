const fs = require('node:fs/promises');
const path = require('node:path');

const pathToFilesFolder = path.join(__dirname, 'files');
const pathToCopyFolder = path.join(__dirname, 'files-copy');

async function copyFiles(pathToOriginal, pathToCopy) {
  try {
    await fs.mkdir(pathToCopy, { recursive: true });
    const files = await fs.readdir(pathToOriginal);
    for (let file of files) {
      const pathToFile = path.join(pathToOriginal, file);
      const pathToFileCopy = path.join(pathToCopy, file);
      const stats = await fs.stat(pathToFile);

      if (stats.isDirectory()) {
        await copyFiles(pathToFile, pathToFileCopy);
      } else {
        await fs.copyFile(pathToFile, pathToFileCopy);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function copyDir() {
  await fs.rm(pathToCopyFolder, { recursive: true, force: true });
  await copyFiles(pathToFilesFolder, pathToCopyFolder);
}

copyDir();
