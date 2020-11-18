// Archivo de configuracion
require('./config/config');

const expres = require('express');
const bodyPareser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

let app = expres();

app.use(bodyPareser.urlencoded( {extended: true, } ));
app.use(bodyPareser.json());

// rutas
app.use(require('./routes/all.routes'));
app.use(cors({ origin: true, credentials: true}));

let mongooseSettings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

mongoose.connect(process.env.URLDB, mongooseSettings, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Base de datos online');
    }
});

app.listen(process.env.PORT, function(){
    console.log('Escuchando en el puerto ', process.env.PORT);
});


