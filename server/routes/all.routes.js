const express = require('express');

const app = express();

app.use('/solicitudes', require('./solicitudes.routes'));
app.use('/consumidores', require('./consumidores.routes'));
app.use('/comercios', require('./comercio.route'));
app.use('/categorias', require('./categoria.route'));
app.use('/auth', require('./auth.routes'));
app.use('/direcciones', require('./direcciones.routes'));

module.exports = app;