let swaggerSpec: any = null;

if (process.env.TESTING !== 'true') {
  const swaggerJSDoc = require('swagger-jsdoc'); // tslint:disable-line

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
  swaggerSpec = swaggerJSDoc(options);
}

export { swaggerSpec };
