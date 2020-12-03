// Archivo de configuracion
const expres = require('express');
const { dbConection } = require('./database/config');
const bodyPareser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

let app = expres();

app.use(bodyPareser.urlencoded( {extended: true, } ));
app.use(bodyPareser.json());
app.use(cors());
// { origin: true, credentials: true}
// rutas

app.use(require('./routes/all.routes'));

dbConection();

app.listen(process.env.PORT, function(){
    console.log('Escuchando en el puerto ', process.env.PORT);
});


