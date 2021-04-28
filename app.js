const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');


const landingRouter = require('./routes/landingPage');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const brotherhoodPageRouter = require('./routes/brotherhoodPage');
const profileRouter = require('./routes/profile');
const favoritesRouter = require('./routes/favoritesPage');
const privacyPolicyRouter = require('./routes/privacyPolicy');
const termsOfUseRouter = require('./routes/termsOfUse');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Projeto Wined+',
  resave: false,
  saveUninitialized: true,
}))

app.use('/', landingRouter);
app.use('/login', loginRouter);
app.use('/cadastrar', registerRouter);
app.use('/confraria', brotherhoodPageRouter);
app.use('/perfil', profileRouter);
app.use('/favorites', favoritesRouter);
app.use('/privacidade', privacyPolicyRouter);
app.use('/termos', termsOfUseRouter);


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
