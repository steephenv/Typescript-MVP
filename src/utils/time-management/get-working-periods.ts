export interface IDayObject {
  startTime: Date;
  endTime: Date;
}
export interface ITimePeriod {
  startTime: number;
  endTime: number;
}

export const getWorkingPeriods = (
  daysArray: IDayObject[],
  workingDays: number[],
  workingTime: ITimePeriod,
  breakTime: ITimePeriod,
) => {
  const timePeriods: IDayObject[] = [];
  daysArray.forEach(eachDay => {
    const dayInWeek = new Date(eachDay.startTime).getDay();
    if (dayInWeek < 6 || dayInWeek > 0 || workingDays.indexOf(dayInWeek) > 0) {
      const periodStart1 = new Date(eachDay.startTime).setUTCHours(
        workingTime.startTime,
        0,
        0,
        0,
      );
      const periodEnd1 = new Date(eachDay.startTime).setUTCHours(
        breakTime.startTime,
        0,
        0,
        0,
      );
      const periodStart2 = new Date(eachDay.startTime).setUTCHours(
        breakTime.endTime,
        0,
        0,
        0,
      );
      const periodEnd2 = new Date(eachDay.startTime).setUTCHours(
        workingTime.endTime,
        0,
        0,
        0,
      );
      timePeriods.push(
        { startTime: new Date(periodStart1), endTime: new Date(periodEnd1) },
        { startTime: new Date(periodStart2), endTime: new Date(periodEnd2) },
      );
    } else {
      return;
    }
  });
  return timePeriods;
};
