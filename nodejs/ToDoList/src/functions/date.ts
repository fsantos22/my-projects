export const strDateToMilliseconds = (dateString: string) => {
  const arrDateString = dateString.split("/");
  const strDate =
    arrDateString[2] + "-" + arrDateString[1] + "-" + arrDateString[0];
  return new Date(strDate).getTime();
};

export const millisecondsToStrDate = (milliseconds: string) => {
  const year = new Date(milliseconds).getFullYear();
  const month = new Date(milliseconds).getMonth()+1;
  const day = new Date(milliseconds).getDate();
  return day + '/' + month + '/' + year
};

export const validateDate = (stringDate: string) => {
  const re = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;
  return re.test(stringDate);
};
