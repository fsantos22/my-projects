export const capitalize = (string: string) => {
  const capitalizedString = string
    .toLocaleLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
  return capitalizedString;
};
