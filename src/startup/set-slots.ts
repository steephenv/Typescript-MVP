import { Promise as BluePromise } from 'bluebird';
import { TimeSlot } from '../models/TimeSlots';

export const createSlot = async () => {
  const slot1 = new TimeSlot({
    title: 'slot 1',
    timePeriod: '9 AM to 10 AM',
  });
  const slot2 = new TimeSlot({
    title: 'slot 2',
    timePeriod: '10 AM to 11 AM',
  });
  const slot3 = new TimeSlot({
    title: 'slot 3',
    timePeriod: '11 AM to 12 PM',
  });
  const slot4 = new TimeSlot({
    title: 'slot 4',
    timePeriod: '12 PM to 1 PM',
  });
  const slot5 = new TimeSlot({
    title: 'slot 5',
    timePeriod: '1 PM to 2 PM',
  });
  const slot6 = new TimeSlot({
    title: 'slot 6',
    timePeriod: '2 PM to 3 PM',
  });
  const slot7 = new TimeSlot({
    title: 'slot 7',
    timePeriod: '3 PM to 4 PM',
  });
  const slot8 = new TimeSlot({
    title: 'slot 8',
    timePeriod: '4 PM to 5 PM',
  });
  const slot9 = new TimeSlot({
    title: 'slot 9',
    timePeriod: '5 PM to 6 PM',
  });
  const slot10 = new TimeSlot({
    title: 'slot 10',
    timePeriod: '6 PM to 7 PM',
  });
  const slots = [
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6,
    slot7,
    slot8,
    slot9,
    slot10,
  ];
  return BluePromise.map(slots, slot => {
    return slot.save();
  });
};
