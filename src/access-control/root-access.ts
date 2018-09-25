/**
 * Only access for devs
 */

import { RequestHandler } from 'express';

const ROOTUNAME = 'urfunny';
const ROOTPSW = 'urfunny';

const login = (auth: string) => {
  const encodedCredentials = auth.split(' ');
  const decodedCredentials = new Buffer(
    encodedCredentials[1],
    'base64',
  ).toString();
  // credentials[0] : username, credentials[1] : pwd
  const credentials = decodedCredentials.split(':');
  if (credentials[0] === ROOTUNAME && credentials[0] === ROOTPSW) {
    return true;
  }
  return false;
};

export const rootAccess: RequestHandler = async (req, res, next) => {
  const auth = req.get('authorization') || req.get('Authorization');
  if (!auth || !login(auth)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
    res.end('<html><body>Invalid credentials</body></html>');
  } else {
    return next();
  }
};
