import { get as getConfig } from 'config';
import * as express from 'express';

// swagger
import { swaggerSpec } from './swagger';

// route imports
import { auth } from './auth';

// create router
export const apis = express.Router();

// define route navigation
apis.use('/auth', auth);

// load docs if requested
if (getConfig('app.docs')) {
  // tslint:disable-next-line:no-var-requires
  // const swaggerSpec = require('./swagger');
  // deliver swagger spec
  console.log('> docs enabled'); // tslint:disable-line:no-console
  apis.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
