import { get as getConfig } from 'config';
import * as express from 'express';

// route imports
import { assigning } from './assigning';

export const apis = express.Router();

apis.use('/assigning', assigning);

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
