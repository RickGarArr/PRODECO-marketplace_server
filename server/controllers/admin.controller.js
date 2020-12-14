// Modelos
const Admin = require('../models/admin.model');
const Categoria = require('../models/categoria.model');
const Solicitud = require('../models/solicitud.model');
const Comercio = require('../models/comercio.model');
const Consumidor = require('../models/consumidor.model');
// -----------------
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt-helper');
const { request } = require('express');
const { borrarCarpeta } = require('../helpers/files');
const path = require('path');
const { sendEmail } = require('../helpers/email');

 //#region -------------------------------- GETS
// Mostrar todas las Solicitudes
const getSolicitudes = async (req = request, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const page_size = 10;
        const skip = (pagina - 1) * page_size;

        const solicitudesDB = await Solicitud.find().skip(skip).limit(page_size);
        res.json({
            ok: true,
            solicitudesDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
// Mostrar todos los comercios
const getComercios = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const page_size = 10;
        const skip = (pagina - 1) * page_size;

        const comerciosDB = await Comercio.find().skip(skip).limit(page_size);
        res.json({
            ok: true,
            comerciosDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
// mostrar todos los consumidores
const getConsumidores = async (req, res) => {
    try {
        const pagina = parseInt(req.query.pagina) || 1;
        const page_size = 10;
        const skip = (pagina - 1) * page_size;
        const consumidoresDB = await Consumidor.find().skip(skip).limit(page_size);
        res.json({
            ok: true,
            consumidoresDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            error
        });
    }
}
// mostrar todas las categorias
const getCategorias = async (req, res) => {
    try {
        const categoriasDB = await Categoria.find();
        res.json({
            ok: true,
            categoriasDB
        });
    } catch (error) {
        console.log(error);
    }
} 
//#endregion

//#region --------------------------------- DELETE
// eliminar una solicitud
const deleteSolicitud = async (req, res) => {
    try {
        // Obtener el valor id de la solicitud a eliminar
        const idSolicitud = req.params.idSolicitud;
        // crear el path de la solicitud
        const pathSolicitud = path.join(__dirname, `../../uploads/solicitudes/${idSolicitud}`);
        // resolver las dos promesas y guardar resultados
        const [solicitudEliminada, resp] = await Promise.all([
            await Solicitud.findByIdAndRemove(idSolicitud),
            await borrarCarpeta(pathSolicitud)
        ]);
        // si no hay solicitud en la base de datos regresa un error
        if (!solicitudEliminada) {
            return res.status(500).json({
                ok: false,
                msg: 'La solicitud no existe en la base de datos'
            });
        }
        // responde 
        res.json({
            solicitudEliminada,
            resp
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}
// Desactivar un comercio
const desactivateComercio = async (req, res) => {
    try {
        const idComercio = req.params.idComercio;
        const comercioDB = await Comercio.findByIdAndUpdate(idComercio, {activo: false}, {new: true});
        if (!comercioDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El comercio no existe en la base de datos'
            });
        }
        res.json({
            ok: true,
            comercioDesactiado: comercioDB
        });
    } catch (error) {
        console.log(error);
    }
}
// desactivar un consumidor
const desactivateConsumidor = async (req, res) => {
    try {
        const idConsumidor = req.params.idConsumidor;
        const consumidorDB = await Consumidor.findByIdAndUpdate(idConsumidor, {activo: false}, {new: true});
        if (!consumidorDB) {
            return res.status(500).json({
                ok: false,
                msg: 'El comercio no existe en la base de datos'
            });
        }
        res.json({
            ok: true,
            usuarioDesactiado: consumidorDB
        });
    } catch (error) {
        console.log(error);
    }
}

//#endregion

const responderSolicitud = async (req, res) => {
    const idSolicitud = req.params.idSolicitud;
    try {
        const solicitudDB = await Solicitud.findByIdAndUpdate(idSolicitud, {});
    } catch (error) {
        console.log(error);
    }
}

// registrar un nuevo administrador
const registerAdmin = async (req, res) => {
    try {
        // deconstruccion de la respuesta
        const {email, password, clave} = req.body;
        // verifica que la clave coincida con el archivo process.env
        if (clave !== process.env.CLAVE) {
            return res.status(500).json({
                ok: false,
                msg: 'Error al crear el administrador'
            });
        }
        // genera el salt para encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        // crea una nueva intancia de un adminisrado
        const admin = new Admin({
            email,
            password: bcrypt.hashSync(password, salt)
        });
        // guardar respuesta de la base de datos al salvar la instancia
        const adminDB = await admin.save();
        // generar el token con el ID del Adminstrador
        const jwt = await generarJWT({uid: adminDB.id});
        // regresar el token
        res.json({
            ok: true,
            token: jwt
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
// eliminar una solicitud

// generar una nueva categoria
const createCategoria = async (req, res) => {
    try {
        const uid = req.uid;
        const categoria = new Categoria({administrador: uid, ...req.body});
        const categoriaDB = await categoria.save();
        res.json({
            ok: true,
            categoriaDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }

}
// actualizar una categoria
const updateCategoria = async (req, res) => {
    try {
        const uid = req.uid;
        const idCategoria = req.params.idCategoria;
        const categoriaDB = await Categoria.findByIdAndUpdate(idCategoria, {administrador: uid, ...req.body}, {new: true});
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                msg: 'La categoria no existe en la base de datos'
            });
        }
        res.json({
            ok: true,
            categoriaDB
        });
    } catch (error) {
        res.status(500).json({
            ok: true,
            error
        });   
    }
}
// desactivar una categoria
const desactivateCategoria = async (req, res) => {
    try {
        const idCategoria = req.params.idCategoria;
        const categoriaDB = await Categoria.findByIdAndUpdate(idCategoria, {activo: false}, {new: true});
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                msg: 'La categoria no existe en la base de datos'
            });
        }
        res.json({
            ok: true,
            msg: {
                msg: 'Categoria desactivada',
                categoriaDB
            }
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
}
// mostrar todos los consumidores registrados

// enviar un email
const sendEmailCtrl = async (req, res) => {
    try {
        const resp = await sendEmail('asdadadwfe', 'ricardogarciarreola@gmail.com');
        res.json({
            resp
        });
    } catch (error) {
        console.log(error);
    }
}
// mostrar todas las categorias registradas


module.exports = {
    registerAdmin,
    getSolicitudes,
    getComercios,
    getConsumidores,
    getCategorias,
    desactivateCategoria,
    desactivateComercio,
    desactivateConsumidor,
    createCategoria,
    updateCategoria,
    deleteSolicitud,
    sendEmailCtrl
}