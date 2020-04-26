var path = require('path');
var express = require('express');
var db = require('../database');
// var bodyParser = require('body-parser')

// var cookieParser = require('cookie-parser');
// var session = require('express-session')

var app = express();

// app.use(session(
//   {
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
//   }
// ))


// app.use(cookieParser());
app.use(express.json());



// middleware
app.use(express.static(__dirname + './../public/'));

// app.get('/', (req, res) => {
//   res.end();
// });

app.post('/customer', (req, res) => {


  db.query('insert into customers values()', (err, result) => {
    if (err) {
      res.end('something went wrong');
    } else {
      res.end(result.insertId.toString());
    }
  });

});

app.post('/customer/info', (req, res) => {

  // console.log(req.body);
  var keys = Object.keys(req.body).filter(x=> x !== 'id');

  console.log(keys);



  for (var key of keys) {
    console.log(key, req.body[key]);
    if (keys.indexOf(key) !== keys.length - 1) {
      db.query(`update customers set ${key} = '${req.body[key]}' where id = ${req.body.id}`, (err, result) => {
        if (err) {
          console.log('something went wrong 59 with', key);
          // console.log(key);
        } else {
          // res.end(result.toString);
        }
      });
    } else if (keys.indexOf(key) === keys.length - 1) {
      db.query(`update customers set ${key} = '${req.body[key]}' where id = ${req.body.id}`, (err, result) => {
        if (err) {
          console.log('something went wrong 67');
        } else {

          db.query(`select * from customers where id = '${req.body.id}'`, (err, result) => {
            if (err) {
              res.end('something went wrong');
            } else {
              res.end(JSON.stringify(result));
            }
          });

        }
      });
    }
  }

});

app.get('/customer/info2', (req, res) => {

  console.log('hey');

  res.redirect('back');

});


var port = 3000;
app.listen(port, (err) => {
  console.log(`listening at http://localhost:${port}`)
});