const express = require('express');
const morgan = require('morgan');
const router = require('./routes/routes'); 

const app = express();

app.use(morgan('dev'));
app.use(express.json());  // middleware
app.use('/', router);

module.exports = app;

