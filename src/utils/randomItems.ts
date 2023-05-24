export const randomItems = (arr: string[]) => {
  return [...arr].sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, 2);
};
