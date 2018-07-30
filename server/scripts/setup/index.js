const fs = require('fs');
const path = require('path');
const { COPYFILE_EXCL } = fs.constants;

fs.copyFile(path.resolve(__dirname, './.env.example'), path.resolve(__dirname, '../../../.env'), COPYFILE_EXCL, (err) => {
    if (err) {
        console.error('[SETUP]', err.message);
    }
});