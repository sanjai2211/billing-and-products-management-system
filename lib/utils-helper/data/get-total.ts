export function calculateTotal(array: any) {
  return array.reduce((total: any, value: any) => total + value, 0);
}

export function calculateTotalByField(array : any, field : any) {
  return array.reduce((total : any, item : any) => total + (item[field] || 0), 0);
}

