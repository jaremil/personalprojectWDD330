const passport = require('passport');

const express = require('express');

const routes = require("express").Router();

const path = require('path');

const { User } = require("../data/connection");

routes.get("/", async (req, res) => {
  res.send(`<a href="/auth">Login with Google</a>`);
});

routes.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

routes.get('/auth/',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/index');
});

routes.get('/index', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.redirect('./index.html');
});

module.exports = routes;