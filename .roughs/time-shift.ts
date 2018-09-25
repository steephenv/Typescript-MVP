const timeDiffWrtIst = -3.5 * 60 * 60 * 1000;

function convertToGermanTime(istDate: Date): Date {
  return new Date(istDate.getTime() + timeDiffWrtIst);
}
