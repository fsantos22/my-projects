export const dateDiff = (date1: Date, date2: Date) => {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return d2 - d1;
};
