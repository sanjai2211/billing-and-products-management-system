import { getTaxCalculationByHsn } from "./getTaxCalculation";
import { calculateDiscountPercentage } from "./percentage";
import { roundedOff } from "./roundedOff";

interface CalculationFields {
  [key: string]: any;
}

function calculateTotals({
  data = [],
  fields = [],
  excludeFields = [],
}: {
  data: any[];
  fields?: string[];
  excludeFields?: string[];
}): CalculationFields {
  const sum = data?.reduce((acc, item) => {
    if (fields && fields.length > 0) {
      // Calculate totals for specified fields
      fields.forEach((field) => {
        if (typeof parseFloat(item[field]) === "number") {
          acc[field] = (acc[field] || 0) + parseFloat(item[field]);
        }
      });
    } else {
      // Calculate totals for all numeric fields by default
      Object.keys(item).forEach((key) => {
        if (
          typeof parseFloat(item[key]) === "number" &&
          (!excludeFields || !excludeFields.includes(key))
        ) {
          acc[key] = (acc[key] || 0) + parseFloat(item[key]);
        }
      });
    }
    return acc;
  }, {} as CalculationFields);

  const result: CalculationFields = {};

  Object.keys(sum).forEach((key: any) => {
    const value = sum[key];
    if (typeof value === "number" || !isNaN(parseFloat(value))) {
      result[key] = value.toFixed(2);
    } else {
      result[key] = value;
    }
  });
  return result;
}

function billCalculation(billItems: any) {
  const discounted= getTaxCalculationByHsn({ data: billItems });
  const nonDiscounted = getTaxCalculationByHsn({
    data: billItems,
    includeDiscount: false,
  });
  const totalDiscountedAmount = calculateTotals({
    data: discounted,
    fields: ["total", "taxableValue", "cgstTotal", "sgstTotal", "igstTotal"],
  });

  const totalNonDiscountedAmount = calculateTotals({
    data: nonDiscounted,
    fields: ["total", "taxableValue", "cgstTotal", "sgstTotal", "igstTotal"],
  });

  const {
    total: roundedDiscountedTotal,
    value: roundedDiscountedValue,
    symbol: roundedDiscountedSymbol,
  } = roundedOff(totalDiscountedAmount?.total);

  const {
    total: roundedNonDiscountedTotal,
    value: roundedNonDiscountedValue,
    symbol: roundeNondDiscountedSymbol,
  } = roundedOff(totalNonDiscountedAmount?.total);

  return {
    totalItems : billItems?.length,
    discountedTotal: totalDiscountedAmount?.total,
    nonDiscountedTotal: totalNonDiscountedAmount?.total,
    discountedTotalTax: (
      parseFloat(totalDiscountedAmount?.cgstTotal || 0) +
      parseFloat(totalDiscountedAmount?.sgstTotal || 0) +
      parseFloat(totalDiscountedAmount?.igstTotal || 0)
    ).toFixed(2),
    nonDiscountedTotalTax:
      totalNonDiscountedAmount?.cgstTotal +
      totalNonDiscountedAmount?.sgstTotal +
      totalNonDiscountedAmount?.igstTotal,
    totalDiscount :'',
    discountedTaxableValue: totalDiscountedAmount?.taxableValue,
    nonDiscountedTaxableValue: totalNonDiscountedAmount?.taxableValue,
    discountedCgstTotal: totalDiscountedAmount?.cgstTotal,
    nonDiscountedCgstTotal: totalNonDiscountedAmount?.cgstTotal,
    discountedSgstTotal: totalDiscountedAmount?.sgstTotal,
    nonDiscountedSgstTotal: totalNonDiscountedAmount?.sgstTotal,
    discountedIgstTotal: totalDiscountedAmount?.igstTotal,
    nonDiscountedIgstTotal: totalNonDiscountedAmount?.igstTotal,
    discountedAmount: (
      parseFloat(totalNonDiscountedAmount?.taxableValue || 0) -
      parseFloat(totalDiscountedAmount?.taxableValue || 0)
    ).toFixed(2),
    discountReductionInTax: (
      parseFloat(totalNonDiscountedAmount?.cgstTotal || 0) +
      parseFloat(totalNonDiscountedAmount?.sgstTotal || 0) +
      parseFloat(totalNonDiscountedAmount?.igstTotal || 0) -
      parseFloat(totalDiscountedAmount?.cgstTotal || 0) -
      parseFloat(totalDiscountedAmount?.sgstTotal || 0) -
      parseFloat(totalDiscountedAmount?.igstTotal || 0)
    ).toFixed(2),
    discountedPercentage: calculateDiscountPercentage({
      discountedAmount: totalDiscountedAmount?.total,
      originalAmount: totalNonDiscountedAmount?.total,
    }),
    discountedRounded: {
      total: roundedDiscountedTotal,
      value: roundedDiscountedValue,
      symbol: roundedDiscountedSymbol,
    },
    nonDiscountedRounded: {
      total: roundedNonDiscountedTotal,
      value: roundedNonDiscountedValue,
      symbol: roundeNondDiscountedSymbol,
    },
  };
}

export { billCalculation, calculateTotals };
