export const getList = (data: any, field: string, subField: any) => {
  return Array.isArray(data)
    ? data?.map((item: any) => ({
        value: item?.id,
        label: item[field],
        subField: item[subField],
      }))
    : [];
};
