export const getArrayWithFieldValues = (data : any, path : any) => {
  const pathParts = path.split('/');

  return data.map((item : any) => {
    let value = item;
    for (const part of pathParts) {
      value = value[part];
      if (value === undefined) {
        break;
      }
    }
    return value;
  }).filter((value : any) => value !== undefined);
};