const Helpers = require('./Helper');
const Router = require('./Router/Routes');
const ErrorHandler = require('./Errors/ErrorHandler');

const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const express = require('express');
const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.use(express.static(__dirname+'/../Public'));

App.use(cookieParser('nodecep'));
App.use(session({
    cookie: {
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24
    },
    secret: 'nodecep',
    resave: false,
    saveUninitialized: false
}))

App.use(flash());

App.use((request, response, next) => {
    response.locals.helper = Helpers;
    next();
});

App.set('view engine', 'ejs');
App.set('views', __dirname+'/Views');

App.use('/', Router);
App.use('/', ErrorHandler.NotFound);

module.exports = App;