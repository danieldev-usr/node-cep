const Helpers = require('./Helpers');
const Router = require('./Router/Routes');
const ErrorHandler = require('./Errors/ErrorHandler')

const express = require('express');
const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended:true }));

App.use(express.static(__dirname+'/../public'));

App.use((request, response, next) => {
    response.locals.helper = Helpers;
    next();
})

App.set('view engine', 'ejs');
App.set('views', __dirname + '/Views')

App.use('/', Router)

App.use('/', ErrorHandler.NotFound)

module.exports = App;