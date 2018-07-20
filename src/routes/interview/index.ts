import * as express from 'express';

import { saveAvailability } from './save-availability-calender';
import { listBPMAvailability } from './list-availability';
import { scheduleInterview } from './schedule-interview';
import { getInterviewDate } from '../interview-old/get-interview-date';

export const interview = express.Router();

interview.post('/save-availability-calender', saveAvailability);
interview.get('/list-availability', listBPMAvailability);
interview.post('/schedule-interview', scheduleInterview);
interview.get('/get-date', getInterviewDate);
