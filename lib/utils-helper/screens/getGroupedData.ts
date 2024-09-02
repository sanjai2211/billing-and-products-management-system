export function getGrouppedData(array: any, path: any) {
  const pathArray = path.split("/");

  return array?.reduce((acc: any, item: any) => {
    const key = pathArray.reduce((obj: any, key: any) => obj[key], item);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);
    return acc;
  }, {});
}

export function groupDataByField(array : any, path : any, keyName : any) {
  if (array.length === 0) {
    return array;
  }

  const pathArray = path.split('/');

  const groupedObject = array?.reduce((acc : any, item : any) => {
    const key = pathArray.reduce((obj: any, key: any) => obj[key], item);
    
    if (!acc[key]) {
      acc[key] = [];
    }
    
    acc[key].push(item);
    return acc;
  }, {});

  const groupedArray = Object.entries(groupedObject).map(([key, items] : any) => {
    if (items.length === 1) {
      return items[0];
    }
    return {
      items: items
    };
  });

  return groupedArray.length === 1 ? array : groupedArray;
}



