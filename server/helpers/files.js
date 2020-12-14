const path = require('path');
const fs = require('fs');

function borrarCarpeta(path) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file) {
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    borrarCarpeta(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
            resolve('Carpeta eliminada correctamente');
        } else {
            reject('No se pudo eliminar la carpeta, hable con el administrador');
        }
    })
}

const guardarArchivo = (archivo, index, pathToSave) => {    
    let nombre;
    let nombreCortado = archivo.name.split('.');
    let extencion = nombreCortado[nombreCortado.length - 1].toLowerCase();

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

    archivo.mv(`${pathToSave}/${nombre}.${extencion}`);
    return `${nombre}.${extencion}`;
}

const verificarArchivos = (files) => {
    if (!files) {
        return [false, 'No ha subido ningun archivo'];
    }
    const ine = files.ine;
    const rfc = files.rfc;
    const domicilio = files.domicilio;

    let extValidas = ['.jpg', '.jpeg', '.png', '.pdf', '.docx'];

    if (!ine) {
        return [false, 'No existe el archivo INE'];
    } else {
        const ext = path.extname(ine.name).toLowerCase();
        if (!extValidas.includes(ext)) {
            return [false, 'El Archivo INE no es un archivo valido']
        }
    }

    if (!rfc) {
        return [false, 'No existe el archivo RFC'];
    } else {
        const ext = path.extname(rfc.name).toLowerCase();
        if (!extValidas.includes(ext)) {
            return [false, 'El Archivo RFC no es un archivo valido']
        }
    }

    if (!domicilio) {
        return [false, 'No existe el archivo COMPROBANTE DE DOMICILIO'];
    } else {
        const ext = path.extname(domicilio.name).toLowerCase();
        if (!extValidas.includes(ext)) {
            return [false, 'El Archivo COMPROBANTE DE DOMICILIO no es un archivo valido']
        }
    }
    return [true, ''];
}

const verificarImagen = (imagen) => {
    const extValidas = ['.jpg', '.jpeg', '.png'];
    const ext = path.extname(imagen.name).toLowerCase();
    if (!extValidas.includes(ext)) {
        return {
            campo: 'imagenes',
            msg: `el Archivo (${imagen.name}) subido no es una imagen valida`
        };
    }
}

const crearDirectorio = async (tipo, id) => {
    return new Promise((resolve, reject) => {
        const dirPath = path.join(__dirname, `../../uploads/${tipo}/${id}`);
        if (!fs.existsSync(dirPath)) {
            fs.mkdir(dirPath, (err) => {
                if (err) {
                    reject('No se pudo crear la carpeta');
                } else {
                    resolve('Carpeta creada correctamente');
                }
            });
        } else {
            reject('No se pudo crear la carpeta');
        }
    });
}

module.exports = {
    verificarImagen,
    verificarArchivos,
    guardarArchivo,
    borrarCarpeta,
    crearDirectorio
}