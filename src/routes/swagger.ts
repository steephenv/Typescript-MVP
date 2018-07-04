import swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Miwago API Docs',
      version: '1.0.0',
      description: '',
    },
    host: 'localhost:6233',
    basePath: '/v1',
  },
  apis: ['**/*.docs.yaml'],
};

export = swaggerJSDoc(options);
