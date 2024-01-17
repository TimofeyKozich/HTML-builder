const fs = require('fs');
const path = require('path');
const readline = require('readline');

const stream = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const { stdin: input, stdout: output } = require('node:process');
const rl = readline.createInterface({ input, output });

rl.question('===== Enter text to write it into the file =====\n', (input) => {
  if (input === "exit") {
    console.log(`===== Good bye! =====`);
    rl.close();
  } else {
    stream.write(`${input}\n`);
  }
});

rl.on('line', (input) => {
  if (input === "exit") {
    console.log(`===== Good bye! =====`);
    rl.close();
  } else {
    stream.write(`${input}\n`);
  }
}); 

rl.on('SIGINT', () => {
  console.log(`===== Good bye! =====`);
  rl.close();
}); 