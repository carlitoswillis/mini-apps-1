var path = require('path');
var express = require('express');
var app = express();

// datanase require

// middleware
app.use(express.static(__dirname + './../public/'));
app.use(express.json());

app.get('/', (req, res) => {
  res.end();
});

var port = 3000;
app.listen(port, (err) => {
  console.log(`listening at http://localhost:${port}`)
});