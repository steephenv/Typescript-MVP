import { RequestHandler } from 'express';
import { Industry } from '../../models/Industries';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const createIndustries: RequestHandler = async (req, res, next) => {
  try {
    const unique = req.body.name.trim().toLowerCase();

    const exsIndustry: any = await Industry.findOne({
      uniqueName: unique,
      // isDelete: false,
    }).exec();
    if (exsIndustry) {
      return next(
        new RequestError(RequestErrorType.CONFLICT, 'Industry Existing !!'),
      );
    }
    req.body.uniqueName = req.body.name.trim().toLowerCase();
    const indus = new Industry(req.body);

    await indus.save();

    return res.status(201).send({
      status: 'success',
    });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
export async function addIndLine(indLine: string) {
  const unique = indLine.trim().toLowerCase();

  const extIndLine: any = await Industry.findOne({
    uniqueName: unique,
  }).exec();

  if (!extIndLine) {
    const newIndLine = new Industry({
      name: indLine,
      uniqueName: unique,
    });
    await newIndLine.save();
    return;
  }
}
