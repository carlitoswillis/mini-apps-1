var mysql = require('mysql');

var connection = mysql.createConnection({
  host : 'localhost',
  user: 'root',
  password: '',
  database : 'my_db'
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
    var sql = "CREATE TABLE customers (id int(11) AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), address1 VARCHAR(255), address2 VARCHAR(255), phone VARCHAR(255), cardnumber VARCHAR(25), expiration VARCHAR(10), cvv int(4), zipcode VARCHAR(255))";
    connection.query(sql, function (err, result) {
      if (err) {
        console.log('table exists');
      } else {
        console.log("Table created");
      }
    });
  }
});



module.exports = connection;