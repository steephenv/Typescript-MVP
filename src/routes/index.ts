import { get as getConfig } from 'config';
import * as express from 'express';

// route imports
import { auth } from './auth';

// create router
export const apis = express.Router();

// define route navigation
apis.use('/auth', auth);

// load docs if requested
if (getConfig('app.docs')) {
  // tslint:disable-next-line:no-var-requires
  const swaggerSpec = require('./swagger');

  // deliver swagger spec
  apis.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
