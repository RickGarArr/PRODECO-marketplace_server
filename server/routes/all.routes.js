const express = require('express');

const app = express();

app.use(require('./solicitud.route'));
app.use(require('./consumidor.route'));
app.use(require('./comercio.route'));
app.use(require('./categoria.route'));

module.exports = app;