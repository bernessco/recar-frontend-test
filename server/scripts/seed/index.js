const createDatabase = require('../../app/database');
const CarPart = require('../../app/models/CarPart');
const data = require('./parts.json')
const dotenv = require('dotenv');

dotenv.config();

async function seed () {
    await createDatabase();
    CarPart.remove({}, (err) => {
        if (err) return console.error(err);
        console.log('[SEEDER] Collection removed');
    });

    let counter = 0;
    data.forEach(async item => {
        await CarPart.create(item, (err) => {
            if (err) return console.error(err);
            counter++;
            console.log(`[SEEDER] Row ${counter}:`, item.name)
            if (counter === data.length) {
                console.log(`[SEEDER] Database seeded successfully. Rows (${counter}) seeded.`);
                process.exit();
            }
        });
    });
}

module.exports = seed();






