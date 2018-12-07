"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("config");
const express = require("express");
// swagger
const swagger_1 = require("./swagger");
// route imports
const auth_1 = require("./auth");
const general_1 = require("./general");
// create router
exports.apis = express.Router();
// define route navigation
exports.apis.use('/auth', auth_1.auth);
exports.apis.use('/general', general_1.general);
// load docs if requested
if (config_1.get('app.docs')) {
    // tslint:disable-next-line:no-var-requires
    // const swaggerSpec = require('./swagger');
    // deliver swagger spec
    console.log('> docs enabled'); // tslint:disable-line:no-console
    exports.apis.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagger_1.swaggerSpec);
    });
}
