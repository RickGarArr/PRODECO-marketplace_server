const nodemailer = require('nodemailer');

const sendEmail = (token, email) => {
    return new Promise((resolve, reject) => {
        const direccion = `http://localhost:3003/${token}`;
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS        
            },
            secure: true,
        });
        
        const mailOptns = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Mensaje de confirmacion',
            text: 'Accede a la siguiente liga para generar tu contraseña',
            html: `<h2>Hola Mundo</h2><a>${direccion}</a>` 
        };

        
        
        transporter.sendMail(mailOptns, function(err, msg) {
            if (err) {
                resolve('Error al enviar mensaje, intente de nuevo')
            } else {
                console.log(msg);
                reject('');
            }
        });
    });
}

module.exports = {
    sendEmail
}