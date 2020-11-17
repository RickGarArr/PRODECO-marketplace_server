// Puerto del servidor o servidor local
process.env.PORT = process.env.PORT || 3003;
// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// Base de datos
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/mercado';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// Caducidad del token
process.env.CADUCIDAD_TOKEN = '2d';
// seed
process.env.SEED = process.env.SEED || 'seed-local';
