const express = require('express');

const app = express();

app.use('/solicitudes', require('./solicitudes.routes'));
app.use('/consumidores', require('./consumidores.routes'));
app.use('/comercios', require('./comercios.routes'));
app.use('/categorias', require('./categorias.routes'));
app.use('/auth', require('./auth.routes'));
app.use('/direcciones', require('./direcciones.routes'));

module.exports = app;