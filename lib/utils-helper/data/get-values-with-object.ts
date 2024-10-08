export const getValuesWithObject = (data: any, path: any) => {
  const pathParts = path?.split("/");

  return data
    .map((item: any) => {
      return getValueFromObjectByPath(item, pathParts);
    })
    .filter((value: any) => value !== undefined);
};

export const getValueFromObjectByPath = (data: any, path: any) => {
  let value = data;
  for (const part of path) {
    value = value[part];
    if (value === undefined) {
      break;
    }
  }
  return value;
};
