export const parseQueryParams = (params: URLSearchParams) => {
  const result: Record<string, any> = {};
  const today = new Date().toISOString();

  params.forEach((value, key) => {
    const [startDate, endDate]: any = value.split(",");
    const date = new Date(startDate);
    const dateRegex = /(?:\d{4}-\d{2}-\d{2})/;

    // Check if the key already exists in the result, and handle arrays
    if (result[key]) {
      // If the key already exists, convert the existing value to an array (if not already)
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      // Add the new value to the array
      result[key].push(value);
    } else if (
      dateRegex.test(startDate) &&
      date instanceof Date &&
      !isNaN(date.getTime())
    ) {
      result[key] = {
        gte: new Date(startDate),
        lte: endDate ? new Date(endDate) : new Date(today),
      };
    } else if (value.includes(",")) {
      result[key] = { in: value.split(",") };
    } else {
      if (value === "false") {
        result[key] = false;
      } else if (value === "true") {
        result[key] = true;
      } else {
        result[key] = value;
      }
    }
  });

  return result;
};
