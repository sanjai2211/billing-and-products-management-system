export const getTaxCalculationByHsn = ({
  data,
  includeDiscount = true,
}: any) => {
  const groupedByHsnCode = data?.reduce((acc: any, item: any) => {
    const { hsnCode, gstPurchase, gstSales, igstPurchase, igstSales } =
      item.product;
    const { cost, quantity, discount } = item;
    const rateOfCgst = parseFloat(gstPurchase);
    const rateOfSgst = parseFloat(gstSales);
    const rateOfIgst = parseFloat(igstPurchase);
    const rate = parseFloat(cost);
    const qty = quantity;
    const disc = includeDiscount ? (discount ? parseFloat(discount) : 0) : 0

    const taxableValue = rate * qty - (rate * qty * disc) / 100;
    const cgstTotal = (taxableValue * rateOfCgst) / 100;
    const sgstTotal = (taxableValue * rateOfSgst) / 100;
    const igstTotal = (taxableValue * rateOfIgst) / 100;

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
    acc[hsnCode].cgstTotal += cgstTotal;
    acc[hsnCode].sgstTotal += sgstTotal;
    acc[hsnCode].igstTotal += igstTotal;
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
