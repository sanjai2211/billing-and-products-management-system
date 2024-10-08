export const generate2DArray = (
  rows: number,
  cols: number,
  fillValue: any = 0
): any[][] => {
  // Create a 2D array with the given rows and columns
  const array: any[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => fillValue)
  );

  return array;
};

export const transposeArray = (array: any) => {
  // Find the number of columns (length of each row) in the original array
  const numCols = array[0].length;
  const transformedArray = [];

  // Initialize an empty array for each column in the original array
  for (let col = 0; col < numCols; col++) {
    transformedArray.push([]);
  }

  // Loop through each row in the original array
  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < numCols; col++) {
      // Push the current value to the corresponding transformed row (column in original)
      transformedArray[col].push((array)[row][col]);
    }
  }

  return transformedArray;
};

export const uniqueArray = (array : any) => {
  return [...new Set(array)];
};

