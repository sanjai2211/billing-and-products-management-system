export function capitalizeFirstLetter(str: string): string {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatString(fieldName: string): string {
  let words = fieldName.split(/(?=[A-Z])|_-/);
  words = words.map((word) => capitalizeFirstLetter(word.toLowerCase()));
  return words.join(" ");
}
export function joinValues(values : any, delimiter = ",") {
  return values.filter(Boolean).join(delimiter);
}
