export const getTaxCalculationByHsn = ({
  data,
  includeDiscount = true,
  isIntraTrade = true
}: any) => {
  const groupedByHsnCode = data?.reduce((acc: any, item: any) => {
    const { hsnCode, gstPurchase } =
      item.product;
    const { cost, quantity, discount } = item;
    const rateOfCgst = parseFloat(gstPurchase)/2;
    const rateOfSgst = parseFloat(gstPurchase)/2;
    const rateOfIgst = parseFloat(gstPurchase);
    const rate = parseFloat(cost);
    const qty = quantity;
    const disc = includeDiscount ? (discount ? parseFloat(discount) : 0) : 0

    const taxableValue = rate * qty - (rate * qty * disc) / 100;
    const cgstTotal = isIntraTrade ? (taxableValue * rateOfCgst) / 100 : 0;
    const sgstTotal = isIntraTrade ? (taxableValue * rateOfSgst) / 100 : 0;
    const igstTotal = !isIntraTrade ? (taxableValue * rateOfIgst) / 100 : 0;

    if (!acc[hsnCode]) {
      acc[hsnCode] = {
        hsnCode,
        taxableValue: 0,
        rateOfCgst,
        cgstTotal: 0,
        rateOfSgst,
        sgstTotal: 0,
        rateOfIgst,
        igstTotal: 0,
        total: 0,
      };
    }

    acc[hsnCode].taxableValue += taxableValue;
    acc[hsnCode].cgstTotal += isIntraTrade ? cgstTotal : 0;
    acc[hsnCode].sgstTotal += isIntraTrade ? sgstTotal : 0;
    acc[hsnCode].igstTotal += !isIntraTrade ? igstTotal : 0;
    acc[hsnCode].total +=
      taxableValue + cgstTotal + sgstTotal + igstTotal;

    return acc;
  }, {});

  const result = Object?.values(groupedByHsnCode)?.map((item: any) => ({
    ...item,
    taxableValue: item.taxableValue.toFixed(2),
    cgstTotal: item.cgstTotal.toFixed(2),
    sgstTotal: item.sgstTotal.toFixed(2),
    igstTotal: item.igstTotal.toFixed(2),
    total: item.total.toFixed(2),
  }));
  return result;
};
