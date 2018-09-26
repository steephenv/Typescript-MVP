import * as Joi from 'joi';
import { RequestHandler } from 'express';

const saveAvailabilitySchema = Joi.object().keys({
  dateRange: Joi.object()
    .keys({
      startDate: Joi.date().required(),
      endDate: Joi.date().required(),
    })
    .required(),
  workingDays: Joi.array()
    .items(Joi.string())
    .required(),
  workingTimeNumber: Joi.object()
    .keys({
      startTime: Joi.number().required(),
      endTime: Joi.number().required(),
    })
    .required(),
  breakTimeNumber: Joi.object()
    .keys({
      startTime: Joi.number().required(),
      endTime: Joi.number().required(),
    })
    .optional(),
  userId: Joi.string().optional(),
  timezone: Joi.string().required(),
  annualAvailability: Joi.number().required(),
});

export const saveAvailabilityRules: RequestHandler = (req, res, next) => {
  Joi.validate(
    req.body,
    saveAvailabilitySchema,
    { stripUnknown: true },
    (err: any) => {
      if (err) {
        return res.status(422).send({
          success: false,
          msg: err,
        });
      }
      // const workingDayNumber = req.body.workingDays.map((day: string) => {
      //   if (day === 'Sunday') {
      //     return 0;
      //   } else if (day === 'Monday') {
      //     return 1;
      //   } else if (day === 'Tuesday') {
      //     return 2;
      //   } else if (day === 'Wednesday') {
      //     return 3;
      //   } else if (day === 'Thursday') {
      //     return 4;
      //   } else if (day === 'Friday') {
      //     return 5;
      //   } else if (day === 'Saturday') {
      //     return 6;
      //   } else {
      //     return;
      //   }
      // });
      // const workingTimeNumber = {
      //   startTime: new Date(req.body.workingTime.startTime).getHours(),
      //   endTime: new Date(req.body.workingTime.endTime).getHours(),
      // };
      // let breakTimeNumber = {
      //   startTime: 13,
      //   endTime: 14,
      // };
      // if (req.body.breakTimeNumber) {
      //   breakTimeNumber = {
      //     startTime: new Date(req.body.breakTime.startTime).getHours(),
      //     endTime: new Date(req.body.breakTime.endTime).getHours(),
      //   };
      // }
      // req.body.workingDayNumber = workingDayNumber;
      // req.body.workingTimeNumber = workingTimeNumber;
      // req.body.breakTimeNumber = breakTimeNumber;
      next();
    },
  );
};
