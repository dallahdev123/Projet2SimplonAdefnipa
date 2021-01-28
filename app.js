var createError = require('http-errors');
var express = require('express');
const mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*SerialPort et soket*/
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const port = new SerialPort('/dev/ttyACM1')

const parser = new Readline()
port.pipe(parser)

const WebSocket = require('ws');

const wss = new WebSocket.Server({port:8888});

wss.on('connection', function connection(ws){
  console.log("New user is connected");
  parser.on('data', function(tmp){
    var temp = Number(tmp.slice(0,5))
    var humidite = Number(tmp.slice(5,10))
    console.log(temp, humidite);
    ws.send(tmp)

    /*Base de données*/
  var con = mysql.createConnection({
    host: "localhost",
    user: "dallah",
    password: "passer",
    database: "meteo_db"
  });

  con.connect(function(err) {

    if (err) throw err;
    console.log("Connected!");
    var sql1 = `INSERT INTO tmp_humidity (temperature, humidite) VALUES ('${temp}','${humidite}')`;
    con.query(sql1, function (err, result1) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
  })

  port.write('ROBOT PLEASE RESPOND\n')
  ws.on("close", ()=>{
    console.log("User has disconnected");
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
