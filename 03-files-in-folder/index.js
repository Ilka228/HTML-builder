const { stat, readdir } = require('fs/promises');
const { join, extname, basename } = require('path');

const filePath = join(__dirname, 'secret-folder');
function stats(fileName) {
  return stat(`${filePath}/${fileName}`);
}

function results(name, fileSize) {
  const extension = extname(name);
  const fileName = basename(name, extension);
  const result = `${fileName} - ${extension.slice(1)} - ${(
    fileSize.size / 1024
  ).toFixed(3)}kb`;
  return result;
}

(async () => {
  for (const item of await readdir(filePath, { withFileTypes: true })) {
    if (item.isFile()) {
      const fileSize = await stats(item.name);
      const result = results(item.name, fileSize);
      console.log(result);
    }
  }
})();

