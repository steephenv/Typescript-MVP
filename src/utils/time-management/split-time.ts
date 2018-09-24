export interface ISplittedTime {
  startTime: Date;
  endTime: Date;
}

export const splitTime = (
  startDate: Date,
  endDate: Date,
  duration: number,
): ISplittedTime[] => {
  const startTimeMs = startDate.getTime();
  const endTimeMs = endDate.getTime();

  // console.log('.............!!!!!!!!!!!!!1111', startTimeMs, )

  // if (duration !== 3600000) {
  //   endTimeMs = endDate.getTime() + 1;
  // }

  if (endTimeMs < startTimeMs || (endTimeMs - startTimeMs) % duration) {
    const err = new Error(`MOD_ERR`);
    err.message = `(${endTimeMs}-${startTimeMs}%${duration})!=0 or endTime<startTime`;
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
