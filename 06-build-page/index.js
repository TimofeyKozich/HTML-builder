const fs = require('fs/promises');
const {createReadStream, createWriteStream} = require('fs');
const path = require('path');

const newDirPath = path.join(__dirname, 'project-dist');
const pathToAssets = path.join(__dirname, 'assets');
const pathToStyles = path.join(__dirname, 'styles');
const pathToAssetsCopy = path.join(newDirPath, 'assets');

async function createDir(pathToDir) {
  try {
    await fs.mkdir(pathToDir, { recursive: true });

  } catch (err) {
    console.log(err);
  }
}

createDir(newDirPath);
createDir(pathToAssetsCopy);

async function copyDir(pathToOriginal, pathToCopy) {
  try {
    const files = await fs.readdir(pathToOriginal);
    for (let file of files) {
      const pathToFile = path.join(pathToOriginal, file);
      const pathToFileCopy = path.join(pathToCopy, file);
      const stats = await fs.stat(pathToFile);

      if (stats.isDirectory()) {
        await createDir(pathToFileCopy);
        await copyDir(pathToFile, pathToFileCopy);

      } else {
        await fs.copyFile(pathToFile, pathToFileCopy);
      }
    }

  } catch (err) {
    console.log(err);
  }
}

copyDir(pathToAssets, pathToAssetsCopy);

async function createBundle(pathToFilesDir, pathToBundle) {
  try {
    const files = await fs.readdir(pathToFilesDir);
    const ws = createWriteStream(pathToBundle);

    for (let file of files) {
      const pathToFile = path.join(pathToFilesDir, file);
      const rs = createReadStream(pathToFile, {encoding: 'utf-8'});
      rs.pipe(ws);
    }
  } catch (err) {
    console.log(err);
  }
}

createBundle(pathToStyles, path.join(newDirPath, 'style.css'));

async function createHTML() {
  try {
    const articles = await fs.readFile(path.join(__dirname, 'components', 'articles.html'), {encoding: 'utf-8'});
    const footer = await fs.readFile(path.join(__dirname, 'components', 'footer.html'), {encoding: 'utf-8'});
    const header = await fs.readFile(path.join(__dirname, 'components', 'header.html'), {encoding: 'utf-8'});
    const template = await fs.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});

    const t1 = template.replace('{{articles}}', articles);
    const t2 = t1.replace('{{header}}', header);
    const t3 = t2.replace('{{footer}}', footer);

    await fs.writeFile(path.join(newDirPath, 'template.html'), t3);

  } catch (err) {
    console.log(err);
  }
}

createHTML();