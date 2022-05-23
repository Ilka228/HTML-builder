const { readdir, mkdir, copyFile, rm } = require('fs/promises');
const { join } = require('path');

const filesPath = join(__dirname, 'files');
const copiedFilesPath = join(__dirname, 'files-copy');

async function copy(source, destination) {
  const files = await readdir(source, { withFileTypes: true });
  await mkdir(destination, { recursive: true });
  
  files.forEach(async (file) => {
    const sourcePath = join(source, file.name);
    const destinationPath = join(destination, file.name);
    if (file.isFile()) {
      await copyFile(sourcePath, destinationPath);
    } else {
      await copy(sourcePath, destinationPath);
    }
  });
}
(async () => {
  await rm(copiedFilesPath, { recursive: true, force: true });
  await mkdir(copiedFilesPath, { recursive: true });
  await copy(filesPath, copiedFilesPath);
})();


