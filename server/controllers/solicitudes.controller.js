const Solicitud = require('../models/solicitud.model');
const path = require('path');
const fs = require('fs');

const { verificarArchivos, guardarArchivo } = require('../helpers/files');
const { generarJWT } = require('../helpers/jwt-helper');

const getSolicitudes = async (req, res) => {
    try {
        const solicitudesDB = await Solicitud.find();
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
const getSolicitud = async (req, res) => {
    try {
        const id = req.params.id;
        const solicitudDB = await Solicitud.findById(id);
        if (!solicitudDB) {
            return res.status(500).json({
                ok: false,
                msg: 'La solicitud no existe'
            });
        }
        res.json({
            ok: true,
            solicitudDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
const postSolicitud = async (req, res) => {
    try {
        // decostruccion del objeto req.body
        const { nombre, telefono, email } = req.body;
        // Verificacion dearchivos (!null, ext)
        let files = req.files;
        if (verificarArchivos(files)[0] === false) {
            return res.status(500).json({
                ok: false,
                msg: respuesta[1]
            });
        }
        // crear un a instancia del modelo Solicitud
        const solicitud = new Solicitud({
            nombre,
            telefono,
            email
        });
        const solicitudDB = await solicitud.save();
        
        let pathSolicitud = path.resolve(__dirname, `../../uploads/solicitudes/${solicitudDB.id}`);
        fs.mkdirSync(pathSolicitud);
        
        const archivos = [files.ine, files.rfc, files.domicilio];
        const nombresDB = archivos.map( (archivo, index) => {
            return guardarArchivo(archivo, index, pathSolicitud);
        });

        const [ine, rfc, domicilio] = nombresDB;

        solicitudDB.ine = ine;
        solicitudDB.rfc = rfc;
        solicitudDB.domicilio = domicilio;

        const respuesta = await solicitudDB.save();
        const payload = {
            nombre: solicitudDB.nombre,
            email: solicitudDB.email,
            telefono: solicitudDB.telefono,
            solicitud: solicitudDB.id
        };
        
        const token = await generarJWT(payload);
        
        res.json({
            ok: true,
            respuesta,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}
const sendImage = async (req, res) => {
    try {
        let id = req.params.id;
        let imagen = req.params.imagen;
    
        let pathArchivo = path.join(__dirname, `../../uploads/solicitudes/${id}/${imagen}`);
    
        if (!fs.existsSync(pathArchivo)) {
            pathArchivo = path.join(__dirname, '../../uploads/no-image.png');
            res.sendFile(pathArchivo);
        } else {
            res.sendFile(pathArchivo);
        }
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    getSolicitudes,
    getSolicitud,
    postSolicitud,
    sendImage
}