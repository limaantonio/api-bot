const express = require('express');

const testeController = require('./controllers/testeController')

const routes = express.Router();

routes.get('/', testeController.teste);
routes.post('/cursowebhook', testeController.fulfillmentText);

module.exports = routes;