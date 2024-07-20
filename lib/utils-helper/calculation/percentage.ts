export function calculatePercentage({ part, whole }: any) {
  if (whole === 0) {
    return null;
  }

  const percentage = (parseFloat(part || 0) / parseFloat(whole)) * 100;
  return percentage.toFixed(2);
}

export function calculateDiscountPercentage({
  originalAmount,
  discountedAmount,
}: any) {
  originalAmount = parseFloat(originalAmount || 0);
  discountedAmount = parseFloat(discountedAmount);
  if (originalAmount === 0) {
    return 0;
  }
  const discountAmount = originalAmount - discountedAmount;
  return ((discountAmount / originalAmount) * 100).toFixed(2);
}
