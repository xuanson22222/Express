var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');
require('./models/sinhvienModel');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const sinhvien = require('./models/sinhvienModel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose
  .connect('mongodb://localhost:27017/md19302')
  .then(() => console.log('>>>>>>>> DB Connected!!!!!!'))
  .catch((err) => console.log('>>>>>>> DB Error', err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sinhvien', sinhvien);

// ---------------- Multer Configuration ----------------


