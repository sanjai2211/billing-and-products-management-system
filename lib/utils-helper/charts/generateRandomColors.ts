const getRandomColor = (alpha = 1) => {
  const getRandomInt = () => Math.floor(Math.random() * 256);
  const r = getRandomInt();
  const g = getRandomInt();
  const b = getRandomInt();
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const generateRandomColors = (count: any, alpha = 1) =>
  Array.from({ length: count }, () => getRandomColor(alpha));
