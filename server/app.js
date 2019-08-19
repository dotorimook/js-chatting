import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import cors from 'cors';

import indexRouter from './routes/index';
import ejs from 'ejs';


var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    /** test를 위해서 풀어놓음 */
    // if (whitelist.indexOf(origin) !== -1) {
    //   callback(null, true)
    // } else {
    //   callback(new Error('Not allowed by CORS'))
    // }
    callback(null,true);
  }
}

const sessionMidleware = session({
  secret: 'PAYZZANG',
  resave: false,
  saveUninitialized: true,
});
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(sessionMidleware);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public/resources/static')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err.err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.send({
    message: err.message
  });
});

module.exports = app;
