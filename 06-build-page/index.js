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
    const template = await fs.readFile(path.join(__dirname, 'template.html'), {encoding: 'utf-8'});

    async function replaceComponent(temp) {
      const firstPart = temp.slice(0, temp.indexOf('{{')).trim();
      const secondPart = temp.slice(temp.indexOf('}}') + 2).trim();

      const nameOfComponent = temp.slice(temp.indexOf('{{') + 2, temp.indexOf('}}'));
      const component = await fs.readFile(path.join(__dirname, 'components', `${nameOfComponent}.html`), {encoding: 'utf-8'});

      let newTemp = `${firstPart}\n${component.trim()}\n${secondPart}`;

      if (newTemp.includes('{{')) {
        newTemp = await replaceComponent(newTemp)
      }

      return newTemp;
    }

    replaceComponent(template);

    await fs.writeFile(path.join(newDirPath, 'index.html'), await replaceComponent(template));

  } catch (err) {
    console.log(err);
  }
}

createHTML();