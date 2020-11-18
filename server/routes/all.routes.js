const express = require('express');

const app = express();

app.use(require('./solicitud.route'));
app.use(require('./consumidor.route'));

module.exports = app;