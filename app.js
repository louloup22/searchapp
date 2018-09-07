var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var DocumentDBClient = require('documentdb').DocumentClient;
var config = require('./config');
var passport = require('passport');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local');
var DBManager = require('./controllers/DbManager');
var session = require('express-session')



var TaskList = require('./routes/tasklist');
var TaskModel = require('./models/task-model');	
//var popup = require('popups');
//var flash = require('flash');
//var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var searchRouter = require('./routes/search');
var loginRouter =require('./routes/login');
var signupRouter = require('./routes/signup');
var successRouter = require('./routes/success');
var success2Router= require('./routes/success2');
var uploadRouter = require('./routes/upload');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Cosmos DB connection and task
var docDbClient = new DocumentDBClient(config.host, {
    masterKey: config.authKey
});
//let taskModel = new TaskModel(docDbClient, config.databaseId, config.collectionId);
//let taskList = new TaskList(taskModel);
//taskModel.init();
var authenticator = new DBManager(docDbClient, config.databaseId, config.collectionId);
authenticator.init(function(err) { if(err) throw err; });

//===============PASSPORT===============
// Passport session setup.
passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user.username);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});


passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    authenticator.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        req.session.user = user;
        console.log(req.session.user);
        console.log(req.session.user.blobname);
        // req.session.dbManager = authenticator;
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));


// Use the LocalStrategy within Passport to register/"signup" users.
passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    authenticator.localReg(username, password, req.body.blobname, req.body.blobkey, req.body.cosmoshost, req.body.cosmoskey, req.body.azurename, req.body.azurekey)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        req.session.user = user;
        console.log(req.session.user);
        console.log(req.session.user.blobname);
        // req.session.dbManager = authenticator;
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(flash());
//app.use(session({ secret: 'example',resave: false, saveUninitialized: true }));
//app.use(express.static(__dirname + '/public'));






// Session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.use('/success', successRouter);
app.use('/signup', signupRouter);
app.use('/upload', uploadRouter);
//app.post('/search', searchRouter);



//app.get('/todolist', taskList.showTasks.bind(taskList));
//app.post('/todolist/addtask', taskList.addTask.bind(taskList));
//app.post('/todolist/completetask', taskList.completeTask.bind(taskList));
//app.set('view engine', 'pug');


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

