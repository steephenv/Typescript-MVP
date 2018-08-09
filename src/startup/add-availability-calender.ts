import { InterviewAvailabilityCalender } from '../models/InterviewAvailabilityCalender';

const data = [
  {
    _id: '5b6c0c506068b5041847fbdc',
    booked: false,
    userId: '5b6c04094d27ef4e82b47e6b',
    startTime: '2018-08-27T05:30:00.000Z',
    endTime: '2018-08-27T06:30:00.000Z',
    slotDayStartingTime: '2018-08-26T18:30:00.000Z',
    createdAt: '2018-08-09T09:41:36.421Z',
    annualAvailability: 20,
    __v: 0,
  },
  {
    _id: '5b6c0c506068b5041847fbda',
    booked: false,
    userId: '5b6c04094d27ef4e82b47e6b',
    startTime: '2018-08-27T03:30:00.000Z',
    endTime: '2018-08-27T04:30:00.000Z',
    slotDayStartingTime: '2018-08-26T18:30:00.000Z',
    createdAt: '2018-08-09T09:41:36.418Z',
    annualAvailability: 20,
    __v: 0,
  },
  {
    _id: '5b6c0c506068b5041847fbdd',
    booked: false,
    userId: '5b6c04094d27ef4e82b47e6b',
    startTime: '2018-08-27T06:30:00.000Z',
    endTime: '2018-08-27T07:30:00.000Z',
    slotDayStartingTime: '2018-08-26T18:30:00.000Z',
    createdAt: '2018-08-09T09:41:36.423Z',
    annualAvailability: 20,
    __v: 0,
  },
  {
    _id: '5b6c0c506068b5041847fc12',
    booked: false,
    userId: '5b6c04094d27ef4e82b47e6b',
    startTime: '2018-09-03T03:30:00.000Z',
    endTime: '2018-09-03T04:30:00.000Z',
    slotDayStartingTime: '2018-09-02T18:30:00.000Z',
    createdAt: '2018-08-09T09:41:36.458Z',
    annualAvailability: 20,
    __v: 0,
  },
];

export const createAvail = () => InterviewAvailabilityCalender.create(data);
