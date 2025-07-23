if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const passport = require('passport');
const session = require('express-session');
const express = require('express');
const path = require('path');
var app = express();
require('./oauth/google_auth.js');

app.use('/styles', express.static(path.join(__dirname, 'styles')));

const MongoStore = require('connect-mongo');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

app.use(passport.initialize());
app.use(passport.session()); 

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(express.static('public'));
app.use(express.static('styles'));

const projectsRouter = require('./oauth/routes.js')
app.use('/', projectsRouter);

const multer = require("multer");
const cors = require("cors");

// const port = process.env.PORT || 3000;

const upload = multer({ dest: "uploads/" });

app.use(cors());

app.use(express.static("public"));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server is running on port 3000')
});