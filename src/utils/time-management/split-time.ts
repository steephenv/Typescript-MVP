export interface ISplittedTime {
  startTime: Date;
  endTime: Date;
}

export const splitTime = (
  startDate: Date,
  endDate: Date,
  duration = 60 * 60 * 1000,
): ISplittedTime[] => {
  const startTimeMs = startDate.getTime();
  const endTimeMs = endDate.getTime();

  if (endTimeMs < startTimeMs || (endTimeMs - startTimeMs) % duration) {
    const err = new Error(`MOD_ERR`);
    err.message = `(${endTimeMs}-${endTimeMs}%${duration})!=0 or endTime<startTime`;
    throw err;
  }

  let stripPointer = startTimeMs;
  const slots = [];

  while (stripPointer < endTimeMs) {
    const newEndTimeMs = stripPointer + duration;

    const newStartDate = new Date(stripPointer);
    const newEndDate = new Date(newEndTimeMs);
    slots.push({ startTime: newStartDate, endTime: newEndDate });
    stripPointer = newEndTimeMs;
  }

  return slots;
};

// const dayDiff = (
//   startDate: Date,
//   endDate: Date,
//   duration = 60 * 60 * 1000,
// ): Object<{ startTime: Date; endTime: Date }> => {
//   return { startTime: new Date(), endTime: new Date() };
// };

// const d1 = new Date('2018-07-17T13:00:00.000Z');
// const d2 = new Date('2018-07-18T15:00:00.000Z');
// console.log(splitTime(d1, d2));
