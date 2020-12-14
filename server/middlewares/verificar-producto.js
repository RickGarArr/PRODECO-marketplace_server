// middleware para verificar informacion del posteo de un producto
const { verificarImagen } = require('../helpers/files');
const verificarProducto = (req, res, next) => {
    try {
        const jsonInfo = JSON.parse(req.body.productoInfo);
        let errores = [];

        //#region verificacion de imagenes
        if (!req.files) {
            return res.status(500).json({
                msg: 'No se ha subido ninguna imagen'
            });
        }
        if (!req.files.imagenPrincipal) {
            return res.status(500).json({
                campo: 'imagenPrincipal',
                msg: 'No se ha subido imagen principal'
            });
        }
        if (!req.files.imagenes) {
            return res.status(500).json({
                campo: 'imagenes',
                msg: 'Deb subir almenos 2 imagenes descriptivas'
            });
        }
        let keys = Object.keys(req.files.imagenes);
        if (keys[0] === 'name') {
            const result = verificarImagen(req.files.imagenes);
            if (result != true){
                errores.push(result)
            }
        } else {
            for (let i = 0; i <= keys.length - 1; i++) {
                let respuesta = verificarImagen(req.files.imagenes[i]);
                if (respuesta =! true) {
                    errores.push(respuesta);
                }
            }
        }
        //#endregion 
        
        if (errores.length > 0) {
            return res.status(500).json({
                ok: false,
                errors: errores
            });
        }
        
        req.imgPrincipal = req.files.imagenPrincipal;
        req.imagenes = req.files.imagenes;
        req.body = jsonInfo;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    verificarProducto
}