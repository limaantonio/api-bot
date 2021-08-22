const express = require('express');

const ApiController = require('./controllers/ApiController')

const routes = express.Router();

routes.post('/apiwebhook', ApiController.fulfillmentText);

module.exports = routes;