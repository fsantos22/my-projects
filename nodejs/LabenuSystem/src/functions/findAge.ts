export const findAge = (birthDate: Date): number => {
//   const birthToNumber = new Date.(birthDate).getTime();
  const userYear = new Date(birthDate).getFullYear();
  const userMonth = new Date(birthDate).getMonth()+1;
  const userDay = new Date(birthDate).getDate();

  //   Pegando os dados da data de hoje
  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth()+1;
  const todayDay = new Date().getDate();

  //   Checando idade no dia de hoje
  let age: number;
  if (todayDay < userDay) {
    if (todayMonth <= userMonth) {
      return (age = todayYear - userYear - 1);
    } else {
      return (age = todayYear - userYear);
    }
  } else {
    if (todayMonth <= userMonth) {
      return (age = todayYear - userYear);
    } else {
      return (age = todayYear - userYear - 1);
    }
  }
};