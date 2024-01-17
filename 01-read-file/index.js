const fs = require('fs');
const path = require('path');
let data = "";

const stream = fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding: 'utf-8'});

stream.on('data', (chunk) => {
  data += chunk;
});

stream.on('end', () => {
  console.log(data);
});

stream.on('error', (err) => {
  console.log(err);
});