require('dotenv').config();


require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const passport = require('passport');
const session = require('express-session');

// require('/auth/google')(passport); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});