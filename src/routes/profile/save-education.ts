import { RequestHandler } from 'express';
import { Promise as BluePromise } from 'bluebird';
import { educationDetails } from '../../models/Education';

import {
  RequestError,
  RequestErrorType,
} from '../../error-handler/RequestError';

export const saveEducation: RequestHandler = async (req, res, next) => {
  try {
    await BluePromise.map(req.body.educations, async (education: any) => {
      const newData = new educationDetails({
        updatedAt: new Date(),
        duration: {
          from: req.body.from,
          to: req.body.to,
        },
        typeOfInstitution: req.body.typeOfInstitution,
        nameOfInstitution: req.body.nameOfInstitution,
        locationCountry: req.body.locationCountry,
        locationCity: req.body.locationCity,
        major: req.body.major,
        degree: req.body.degree,
        grade: req.body.grade,
        mainSubjects: req.body.mainSubjects,
        gradeOfMainSubjects: req.body.gradeOfMainSubjects,
        activities: req.body.activities,
      });
      await educationDetails.update(
        { userId: req.params.userId },
        { $set: { newData } },
        { upsert: true },
      );
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    return next(new RequestError(RequestErrorType.INTERNAL_SERVER_ERROR, err));
  }
};
