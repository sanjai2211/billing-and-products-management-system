export function numberToWords(num: number): string {
  num = Math.round(num);
  if (num === 0) return "Zero";

  const belowTwenty = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

  function helper(n: number): string {
    if (n === 0) return "";
    if (n < 20) return belowTwenty[n] + " ";
    if (n < 100) return tens[Math.floor(n / 10)] + " " + helper(n % 10);
    if (n < 1000)
      return belowTwenty[Math.floor(n / 100)] + " Hundred and " + helper(n % 100);
    for (let i = 0; i < thousands.length; i++) {
      if (n < 1000 ** (i + 1)) {
        return (
          helper(Math.floor(n / 1000 ** i)) +
          thousands[i] +
          " " +
          helper(n % 1000 ** i)
        );
      }
    }
    return "";
  }

  return helper(num).trim();
}

