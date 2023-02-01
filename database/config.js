const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('init db config');
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });

        console.log('DB online');
    } catch(error) {
        console.log(error);
        throw new Error('Error in the database - Get in touch with the admin');
    }
};

module.exports = {
    dbConnection
}