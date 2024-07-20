export function roundedOff(number: any) {
  const rounded = Math.round(number) - number;
  return {
    symbol: rounded > 0 ? "+" : "-",
    value: Math.abs(rounded || 0).toFixed(2),
    total : Math.round(number || 0).toFixed(2)
  };
}
