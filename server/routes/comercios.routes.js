const Comercio = require('../models/comercio.model');
const {Router} = require('express');
const { verificarToken } = require('../middlewares/autenticacion');
// ------------ /comercios
const router = Router();

module.exports = router;