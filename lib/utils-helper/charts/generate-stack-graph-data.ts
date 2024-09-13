import { dataTagSymbol } from "@tanstack/react-query";
import { generate2DArray, uniqueArray } from "../data/array";
import {
  getValueFromObjectByPath,
  getValuesWithObject,
} from "../data/get-values-with-object";
import { attachColorsByPath, modifyOpacity } from "./chart-colors";
import { generateGraphData } from "./generate-graph-data";

export const generateStackGraphData = (data: any, field: any) => {
  let arr: any = [[]];

  data?.forEach((item: any, index: number) => {
    if (item?.items) {
      item?.items?.forEach((subItem: any, subRowInd: number) => {
        // If the sub-row array does not exist, create it
        if (!arr[subRowInd]) arr[subRowInd] = [];

        // Fill the sub-row with the corresponding cost
        arr[subRowInd][index] = subItem[field] || 0;
        console.log({
          subItem,
          subRowInd,
          a: subItem[field],
          arr,
          field,
          item,
        });
      });
    } else {
      arr[0][index] = item[field] || 0;
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

export const generateStackGraphGroupData = ({
  data,
  fields, // Now accepts an array of field names
  groupBy,
  grouppedData = [],
  rows,
  columns,
  colors,
  colorsPath,
  labelPath,
}: any) => {
  // Get unique group data
  const getGrouppedData = () => {
    const grouppedData = getValuesWithObject(data, groupBy);
    console.log({colIndx : grouppedData,data,groupBy})
    return uniqueArray(grouppedData);
  };

  let groupData: any =
    grouppedData?.length > 0 ? grouppedData : getGrouppedData();

  // Initialize an object to hold the 2D arrays for each field
  let fieldArrays: any = {};

  // Create 2D array for each field
  fields.forEach((field: string) => {
    fieldArrays[field] = generate2DArray(rows, columns, null); // Generate 2D arrays filled with 0
  });

  const insertData = (item: any, rowIndex: any) => {
    // Getting current group data from the object to find the column index
    const currentGrouppedData = getValuesWithObject([item], groupBy)?.[0];
    const colIndex: any = groupData?.indexOf(currentGrouppedData);

    // Insert values for each field
    fields.forEach((field: string) => {
      fieldArrays[field][rowIndex][colIndex] = item[field] || 0;
      console.log({
        item,
        rowIndex,
        colIndex,
        aaa: item[field],
        field,
        groupData,
      });
    });
  };

  // Iterate over the data
  data?.forEach((item: any, index: any) => {
    if (item?.items) {
      item?.items?.forEach((subItem: any, subItemIndex: any) => {
        insertData(subItem, index);
      });
    } else {
      insertData(item, index);
    }
    // if (colors) {
      const color = attachColorsByPath([item], colors, colorsPath);
      const label = getValuesWithObject([item], labelPath);
      console.log({label,labelPath,item})


      fields.forEach((field: string) => {
        const data = fieldArrays[field][index];
        // fieldArrays[field][index] = generateGraphData(
        //   data,
        //   productColors,
        //   { stockCode }
        // )
        fieldArrays[field][index] = {
          backgroundColor: modifyOpacity(color, 0.4),
          data,
          borderColor: color,
          borderWidth: 1,
          label
        };
      });
      console.log({fields})
    // }
  });

  return fieldArrays;
};

// [
// [24,25]
// [20,0]
// [10,0]
// [0,41]
//]

//[
//[24,20,10,0]
//[25,0,0,41]
//]

// [
//  [24,12]
//  [20,0]
//  [10,0]
//  [0,41]
//
// ]
