const express = require('express');
const app = express();
const db = require('./db');

app.use('/users', require('./user/UserController'));

module.exports = app;
