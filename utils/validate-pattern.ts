export const validatePattern = (data: string, pattern: any) => {
  return pattern.test(data);
};
