"use strict";
// import { get as getConfig } from 'config';
Object.defineProperty(exports, "__esModule", { value: true });
let swaggerSpec = null;
exports.swaggerSpec = swaggerSpec;
// if (process.env.TESTING !== 'true') {
const swaggerJSDoc = require('swagger-jsdoc'); // tslint:disable-line
const options = {
    swaggerDefinition: {
        info: {
            title: 'Capricorns API Docs',
            version: '1.0.0',
            description: '',
        },
        // host: getConfig('docsUrl'),
        basePath: '/v1',
    },
    apis: ['**/*.docs.yaml'],
};
exports.swaggerSpec = swaggerSpec = swaggerJSDoc(options);
