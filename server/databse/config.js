const mongoose = require('mongoose');

const dbConection = () => {
    mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    };
    mongoose.connect(process.env.DB_LCNN, mongooseOptions, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('base de datos online');
        }
    })
}

module.exports = {
    dbConection
}