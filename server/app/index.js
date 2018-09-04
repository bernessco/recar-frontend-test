const path = require('path');
const portfinder = require('portfinder');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const express = require('express');
const engine = require('consolidate');
const cors = require('cors');

const app = express();
const utils = require('./utils');
const router = require('./router');
const middleware = require('./http/middleware')
const createDatabase = require('./database');
const listEndpoints = require('express-list-endpoints');
portfinder.basePort = 5000;
dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('views', path.resolve(__dirname, './views'));
app.engine('handlebars', engine.handlebars);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    const list = listEndpoints(app).filter(item => {
        if (/^\/api/gm.test(item.path)) {
            return item;
        }
    });
    res.render('./index.handlebars', { list });
});
app.use('/api', middleware, router);
app.use('*', (req, res) => {
    res.status(404).send();
});

async function createApp () {
    const mongoose = await createDatabase();
    const port = await portfinder.getPortPromise();

    app.listen(port, () => {
        utils.genarateStartMessage(port);
        utils.genarateApiList(app)
    });
    
    return { mongoose, app };
}

module.exports = createApp();