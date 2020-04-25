var fs  = require('fs');

module.exports = (file) => {

  // file = fs.createReadStream(file.path, 'utf8');

  // const buf = Buffer.alloc(5);


  // file.on('data', (chunk) => {

  //   buf = Buffer.concat(chunk);

  // });

  // file.on('end', () => {
  //   file = buf;
  // })






  return file.toString();
};