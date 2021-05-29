export const strDateToDate = (dateString: string) => {
  const arrDateString = dateString.split("/");
  return new Date(Number(arrDateString[2]), Number(arrDateString[1])-1, Number(arrDateString[0]));
};
