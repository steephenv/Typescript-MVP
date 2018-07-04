import swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Aumet API Docs',
      version: '1.0.0',
      description: '',
    },
    host: 'localhost:4000',
    basePath: '/api',
  },
  apis: ['**/*.docs.yaml'],
};

export = swaggerJSDoc(options);
