import { country } from '../../models/Country';
import { RequestHandler } from 'express';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const getCitiesFromIso = async (stateIso: string) => {
  const regexp = new RegExp(`^${stateIso}-`);
  return await country
    .find({ type: 'CI', iso: regexp })
    .lean()
    .exec();
};

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
    let stateIso = '';

    if (req.query.state) {
      stateIso = req.query.state;
    } else if (req.query.stateName) {
      const stateDetails: any = await country
        .findOne({
          type: 'RE',
          local_name: new RegExp(`^${req.query.stateName}`),
        })
        .lean()
        .exec();
      stateIso = stateDetails.iso;
    }

    const cities = await getCitiesFromIso(stateIso);

    return res.status(200).send({
      success: true,
      data: cities,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};

export const getCountryDetails: RequestHandler = async (req, res, next) => {
  let countryName = '';
  if (req.query && req.query.countryName) {
    countryName = req.query.countryName;
  }
  try {
    const countryDetails = await country
      .findOne({ type: 'CO', local_name: countryName })
      .lean()
      .exec();
    return res.status(200).send({
      success: true,
      data: countryDetails,
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR));
  }
};
