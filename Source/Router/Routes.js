const homeController = require('../Controllers/homeController');
const consultaController = require('../Controllers/consultaController');

const express = require('express');
const Router = express.Router();

Router.get('/', homeController.index);
Router.get('/consulta', consultaController.index);
Router.post('/consulta', consultaController.getApi);

module.exports = Router;