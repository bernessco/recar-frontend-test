const Router = require('express').Router();
const PartsController = require('./http/controllers/PartsController');

Router.get('/parts', PartsController.getAllParts.bind(PartsController));
Router.post('/parts', PartsController.createCarPart.bind(PartsController));
Router.get('/parts/:id', PartsController.getSinglePart.bind(PartsController));
Router.patch('/parts/:id', PartsController.updatePart.bind(PartsController));
Router.delete('/parts/:id', PartsController.deletePart.bind(PartsController));

module.exports = Router;