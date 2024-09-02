export function sortAscending<T>(data: T[], field: keyof T): T[] {
    return data.sort((a, b) => {
      const fieldA = a[field];
      const fieldB = b[field];
  
      // If the field is a string, use localeCompare for correct string comparison
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return fieldA.localeCompare(fieldB);
      }
  
      // Otherwise, subtract the values for numerical or date comparison
      return (fieldA as number) - (fieldB as number);
    });
  }

  export function sortDescending<T>(data: T[], field: keyof T): T[] {
    return data.sort((a, b) => {
      const fieldA = a[field];
      const fieldB = b[field];
  
      // If the field is a string, use localeCompare for correct string comparison
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return fieldB.localeCompare(fieldA);
      }
  
      // Otherwise, subtract the values in reverse for numerical or date comparison
      return (fieldB as number) - (fieldA as number);
    });
  }
  