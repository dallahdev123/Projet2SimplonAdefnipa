var express = require('express');
const mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "present",
    database: "meteo_db"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var img = 'INSERT INTO image(name_img) VALUES("images/mi.jpg")';
    var img = 'INSERT INTO image(name_img) VALUES("images/ma.jpg")';
    var img = 'INSERT INTO image(name_img) VALUES("images/ciel.jpg")';
    var img = 'INSERT INTO image(name_img) VALUES("images/nuanges.jpg")';

    var sql = "INSERT INTO tmp_humidity (temperature, humidite) VALUES ('30','55')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    con.query(img, function(err, result){
      if (err) throw err;
      console.log(' insertion');
    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
