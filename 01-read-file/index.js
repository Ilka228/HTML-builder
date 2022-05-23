const { ReadStream } = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'text.txt');
const read = new ReadStream(filePath, 'utf8');

read.on('data', (text) => {
  console.log(text.trim());
});