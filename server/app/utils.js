
const Table = require('cli-table');
const colors = require('colors/safe');
const ip = require('ip');
const listEndpoints = require('express-list-endpoints');

exports.genarateStartMessage = function (port) {
    const table = new Table({
        style: {
            head: [],
            border: []
        }
    });
    table.push(
        {
            [colors.yellow('Local')]: colors.cyan('http://localhost:') + port
        },
        {
            [colors.yellow('Network')]: colors.cyan(`http://${ip.address()}:`) + port
        }
    );
    console.log('[Express] App running at:');
    console.log(table.toString());
}

exports.genarateApiList = function (app) {
    const list = listEndpoints(app).filter(item => {
        if (/^\/api/gm.test(item.path)) {
            return item;
        }
    });
    const table = new Table({
        head: ['METHOD', 'PATH'],
        style: {
            head: [],
            border: []
        }
    });
    const render = list.map(item => {
        return {
            [colors.yellow(item.methods[0])]: colors.cyan(item.path)
        };
    });
    table.push(...render);
    console.log(table.toString());
}
