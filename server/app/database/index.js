const colors = require('colors/safe');
const mongoose = require('mongoose');

async function createDatabase () {
    return new Promise(resolve => {
        const DB_URL = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE}`;

        mongoose.connection.on('connecting', () => {
            console.log(`[Mongoose] Connecting to: ${colors.cyan(DB_URL)}`);
        });

        mongoose.connect(DB_URL, {
            useNewUrlParser: true // Old parser deprecated
        });

        mongoose.connection.on('connected', () => {
            console.log(`[Mongoose] ${colors.green('Connected successfully')}`);
        });

        mongoose.connection.on('error', err => {
            console.error('[Mongoose] Connention error:', colors.red(err.message));
        });

        mongoose.connection.once('open', () => {
           resolve(mongoose);
        });
    });
}

module.exports = createDatabase