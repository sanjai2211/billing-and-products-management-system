export const generateStackGraphData = (data: any, field: any) => {
  let arr: any = [[]];

  data?.forEach((item: any, index: number) => {
    arr[0][index] = item[field] || 0;

    if (item?.items) {
      item?.items?.forEach((subItem: any, subRowInd: number) => {
        // If the sub-row array does not exist, create it
        if (!arr[subRowInd + 1]) arr[subRowInd + 1] = [];

        // Fill the sub-row with the corresponding cost
        arr[subRowInd + 1][index] = subItem[field] || 0;
      });
    }
  });

  // Fill remaining empty spots with 0
  arr.forEach((row: any) => {
    for (let i = 0; i < data.length; i++) {
      if (row[i] === undefined) row[i] = 0;
    }
  });

  return arr;
};
