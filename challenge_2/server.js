

// The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
// You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
// You may also assume that child records in the JSON will always be in a property called `children`.

var express = require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs  = require('fs');

// var process = require('./convert.js');

var app = express();

app.use(express.json());


app.use(express.static(__dirname + '/client'));

// app.get('/', (req, res) => {

//   res.sendFile(__dirname + '/client/index.html');

// })

app.post('/upload_json', upload.single('data'), (req, res, next) => {

  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  } else {

    let file = req.file;

    fs.readFile(file.path, 'utf-8', (err, data) => {

      res.end(process(data));
    });

  }

  // res.end('done');
});

var process = (data) => {

  var format = [];

  var keys = [];
  for (var key of Object.keys(JSON.parse(data))) {
    keys.push(key);
  }

  format.push(keys);

  var addData = (format, entry) => {
    var data = [];

    for (var prop of Object.values(entry)) {
      console.log(prop);
      if (Array.isArray(prop)) {
        for (var child of prop) {
          addData(format, child);
        }
        data.push(prop.length)
      } else {
        data.push(prop);
      }
    }

    format.push(data);
  }

  addData(format, JSON.parse(data));

  return format.map(x => x.join(',')).join('\n');
}







var port = 3000;

app.listen(port, (err) => {
  if (err) {
    console.log('oop')
  } else {
    console.log(`listening on port ${port}`);
  }
})