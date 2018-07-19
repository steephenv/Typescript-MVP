import * as express from 'express';

import { saveAvailability } from './save-availability-calender';
import { listBPMAvailability } from './list-availability';
import { scheduleInterview } from './schedule-interview';

export const interview = express.Router();

interview.get('/save-availability-calender', saveAvailability);
interview.get('/list-availability', listBPMAvailability);
interview.post('/schedule-interview', scheduleInterview);
