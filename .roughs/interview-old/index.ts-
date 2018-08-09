import * as express from 'express';

import { scheduleInterviewRules } from './validators/schedule-interview-rules';

import { scheduleInterview } from './schedule-interview';
import { listAvailableDates } from './list-available-dates';
import { getInterviewDate } from './get-interview-date';

export const interviewOld = express.Router();

interviewOld.get('/list-dates', listAvailableDates);
interviewOld.get('/get-date', getInterviewDate);
interviewOld.post(
  '/schedule-interview',
  scheduleInterviewRules,
  scheduleInterview,
);
