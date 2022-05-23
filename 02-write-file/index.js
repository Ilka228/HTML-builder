const { createWriteStream, unlink } = require('fs');
const { join } = require('path');
const { createInterface } = require('readline');
const { stdin: input, stdout: output } = require('process');


const filePath = join(__dirname, 'text.txt');
const rl = createInterface({ input, output });

unlink(filePath, () => {});

const writeFile = (input) => {
  const write = createWriteStream(filePath, { flags: 'a' });
  write.write(input);
  write.end();
};

rl.on('close', () => {
  rl.close();
  console.log('Bye bye');
});

console.log('Write something');

rl.on('line', (userInput) => {
  if (userInput.trim() === 'exit') {
    rl.close();
  } else{
    writeFile(userInput + '\n');
  }
     
});


