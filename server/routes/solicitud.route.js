const express = require('express');
const fileUpload = require('express-fileupload');
const Solicitud = require('../models/solicitud.model');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// metodo para enviar una imagen
app.get('/solicitud/:id/:archivo', function (req, res) {

    let id = req.params.id;
    let archivo = req.params.archivo;

    let pathArchivo = path.resolve(__dirname, `../../uploads/solicitudes/${id}/${archivo}`);

    if (!fs.existsSync(pathArchivo)) {
        res.status(500).json({
            ok: false,
            message: 'El Archivo no existe'
        });
        return;
    } else {
        res.sendFile(pathArchivo);
    }

});

app.get('/solicitud', function (req, res) {
    Solicitud.find().exec((err, solicitudes) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            solicitudes
        });
    });

});
// crear nueva solicitud
app.post('/solicitud/crear', function (req, res) {
    let body = req.body;
    let files = req.files;

    let solicitud = new Solicitud({
        nombre: body.nombre,
        telefono: body.telefono,
        email: body.email,
        ine: '',
        rfc: '',
        domicilio: ''
    });

    solicitud.save((err, solicitudDB) => {
        if (err) {
            return res.json({
                ok: false,
                err
            });
        } else {

            let pathSolicitud = path.resolve(__dirname, `../../uploads/solicitudes/${solicitudDB.id}`);
            fs.mkdirSync(pathSolicitud);

            let archivos = [files.ine, files.rfc, files.domicilio];

            let errores = archivos.map((archivo) => {
                return verificarArchivo(archivo);
            });

            let a = errores.includes(1);
            let b = errores.includes(2);

            if (a || b) {
                Solicitud.findByIdAndDelete(solicitudDB.id, (err, solicitudBorrada) => {
                    if (err) {
                        res.json(500).json({
                            ok: false,
                            err
                        });
                    } else {
                        res.status(500).json({
                            ok: false,
                            err: {
                                message: 'Hubo un problema en la sulicitud'
                            }
                        });;
                    }
                });
               borrarCarpeta(pathSolicitud);
            } else {
                let nombreArchivos = archivos.map((archivo, index) => {
                    return guardarArchivo(archivo, pathSolicitud, index);
                });
                
                solicitudDB.ine = `/solicitud/${solicitudDB.id}/${nombreArchivos[0]}`;
                solicitudDB.rfc = `/solicitud/${solicitudDB.id}/${nombreArchivos[1]}`;
                solicitudDB.domicilio = `/solicitud/${solicitudDB.id}/${nombreArchivos[2]}`;
                
                solicitudDB.save((err, solicitudDB) => {
                    if (err) {
                        res.status(500).json({
                            ok: false,
                            err
                        });
                    } else {
                        let tokenSolicitud = {
                            idSolicitud: solicitudDB.id,
                            nombre: solicitudDB.nombre,
                            telefono: solicitudDB.telefono,
                            email: solicitudDB.email
                        };

                        let token = jwt.sign({solicitud: tokenSolicitud}, process.env.SEED, {expiresIn: process.env.CADUCIDAD_TOKEN});
                        res.json({
                            ok: true,
                            token
                        });
                    }
                });
            }
        }
    });
});

function borrarCarpeta(pathSolicitud) {
    if (fs.existsSync(pathSolicitud)) {
        fs.readdirSync(pathSolicitud).forEach(function(file) {
            var curPath = pathSolicitud + '/' + file;
            if (fs.lstatSync(curPath).isDirectory()){
                borrarCarpeta(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(pathSolicitud);
    }
}

function guardarArchivo(archivo, path, index) {
    let nombre;
    let nombreCortado = archivo.name.split('.');
    let extencion = nombreCortado[nombreCortado.length - 1];

    switch (index) {
        case 0:
            nombre = 'ine';
            break;
        case 1:
            nombre = 'rfc';
            break;
        case 2:
            nombre = 'domicilio';
            break;
    }

    archivo.mv(`${path}/${nombre}.${extencion}`);
    return `${nombre}.${extencion}`;
}

function verificarArchivo(archivo) {
    if (!archivo) {
        return 1;
    } else {
        nombreCortado = archivo.name.split('.');
        let extencion = nombreCortado[nombreCortado.length - 1];
        let extValidas = ['jpg', 'jpeg', 'png', 'pdf', 'docs'];

        if (extValidas.indexOf(extencion) < 0) {
            return 1;
        }
    }
    return 0;
}

module.exports = app;

