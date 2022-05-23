
const { ReadStream, WriteStream, unlink } = require('fs');
const { readdir } = require('fs/promises');
const { join, extname } = require('path');

const stylesPath = join(__dirname, 'styles');
const bundlePath = join(__dirname, 'project-dist', 'bundle.css');

(async () => {
    unlink(bundlePath, () => {});
    for (const file of await readdir(stylesPath, { withFileTypes: true })) {
      if (file.isFile() && extname(file.name) === '.css') {
        const write = await WriteStream(bundlePath, { flags: 'a' });
        const read = await ReadStream(join(stylesPath, file.name), 'utf8');
        read.pipe(write);
      }
    }
})();