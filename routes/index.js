var express = require('express');
const mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var con = mysql.createConnection({
    host: "localhost",
    user: "dallah",
    password: "passer",
    database: "meteo_db"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO tmp_humidity (temperature, humidite) VALUES ('30','55')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
