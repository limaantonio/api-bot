const express = require('express');

const ApiController = require('./controllers/ApiController')
const ContentController = require('./controllers/ContentController')

const routes = express.Router();

routes.post('/apiwebhook', ApiController.fulfillmentText);

routes.post('/create', ContentController.createContent);

routes.get('/list', ContentController.listContent);

module.exports = routes;