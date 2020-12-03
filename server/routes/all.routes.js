const express = require('express');

const app = express();

app.use('/admin', require('./admin.routes'));
app.use('/comercios', require('./comercios.routes'));
app.use('/consumidores', require('./consumidores.routes'));
app.use('/solicitudes', require('./solicitudes.routes'));
app.use('/auth', require('./auth.routes'));

module.exports = app;