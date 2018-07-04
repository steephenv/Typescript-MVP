/**
 * A middleware that verifies JWT token if available
 * and attach it to res.locals.user.
 *
 * This middleware DOES NOT return any error.
 */

import { RequestHandler } from 'express';

import { Jwt } from '../routes/auth/utils/Jwt';

export const attachTokenData: RequestHandler = async (req, res, next) => {
  try {
    const token = (req.get('Authorization') || '').split(' ');

    // check for Bearer token
    if (token[0] === 'Bearer') {
      const decodedToken = await Jwt.verify(token[1]);
      // Attach token to res
      res.locals.user = decodedToken;
    }
    return next();
  } catch (error) {
    return next();
  }
};
