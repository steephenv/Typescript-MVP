import * as express from 'express';

import { scheduleInterviewRules } from './validators/schedule-interview-rules';

import { scheduleInterview } from './schedule-interview';
import { listAvailableDates } from './list-available-dates';
import { getInterviewDate } from './get-interview-date';

export const interview = express.Router();

interview.get('/list-dates', listAvailableDates);
interview.get('/get-date', getInterviewDate);
interview.post(
  '/schedule-interview',
  scheduleInterviewRules,
  scheduleInterview,
);
