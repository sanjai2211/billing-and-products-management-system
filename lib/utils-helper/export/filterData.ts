export const filterExportData = ({ data, fields }: any) => {
  return data?.map((item: any) => {
    const filteredItem: any = {};
    fields.forEach((field: any) => {
      if (field.default || field.included) {
        filteredItem[field.label] = item[field.id] || '-';
      }
    });
    return filteredItem;
  });
};

export const filterJsonExportData = ({ data, fields }: any) => {
  return data?.map((item: any) => {
    const filteredItem: any = {};
    fields.forEach((field: any) => {
      if (field.default || field.included) {
        filteredItem[field.id] = item[field.id] || '-'
      }
    });
    return filteredItem;
  });
};
