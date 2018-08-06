import * as express from 'express';
// import * as queryBoolParser from 'express-query-boolean';

import { saveAvailabilityRules } from './validators/save-availability-rules';
import { scheduleInterviewRules } from './validators/schedule-interview-rules';

import { saveAvailability } from './save-availability-calender';
import { listBPMAvailability } from './list-availability';
import { scheduleInterview } from './schedule-interview';
import { getInterviewDate } from '../interview-old/get-interview-date';

export const interview = express.Router();

interview.post(
  '/save-availability-calender',
  saveAvailabilityRules,
  saveAvailability,
);
interview.get('/list-availability', listBPMAvailability);
interview.post(
  '/schedule-interview',
  scheduleInterviewRules,
  scheduleInterview,
);
interview.get('/get-date', getInterviewDate);
