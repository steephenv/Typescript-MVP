import { country } from '../../models/Country';
import { RequestHandler } from 'express';

import { messages } from '../../config/app/messages';
import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getCountries: RequestHandler = async (req, res, next) => {
  try {
    const countries = await country
      .find({ type: 'CO' })
      .lean()
      .exec();
    return res.status(200).send({
      success: true,
      data: countries,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};

export const getStates: RequestHandler = async (req, res, next) => {
  try {
    if (!req.query.country) {
      req.query.country = '';
    }
    const regexp = new RegExp(`^${req.query.country}-`);
    const states = await country
      .find({ type: 'RE', iso: regexp })
      .lean()
      .exec();
    return res.status(200).send({
      success: true,
      data: states,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};

export const getCities: RequestHandler = async (req, res, next) => {
  try {
    if (!req.query.state) {
      req.query.state = '';
    }
    const regexp = new RegExp(`^${req.query.state}-`);
    const cities = await country
      .find({ type: 'CI', iso: regexp })
      .lean()
      .exec();
    return res.status(200).send({
      success: true,
      data: cities,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
