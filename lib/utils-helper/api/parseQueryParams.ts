export const parseQueryParams = (params: URLSearchParams) => {
  const result: Record<string, any> = {};
  const today = new Date().toISOString();

  params.forEach((value, key) => {
    const [startDate, endDate]: any = value.split(",");
    const date = new Date(startDate);
    const dateRegex = /(?:\d{4}-\d{2}-\d{2})/;

    if (
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
