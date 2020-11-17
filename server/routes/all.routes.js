const express = require('express');

const app = express();

app.use(require('./solicitud.route'));

module.exports = app;