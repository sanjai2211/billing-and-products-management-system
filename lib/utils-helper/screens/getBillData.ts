import { billCalculation } from "../calculation/calculateTotal";
import { getStateCode } from "./newBill";

export const getBillData =(data : any) => {
    const shopStateCode = getStateCode(data?.Shop?.address?.state);
    const customerStateCode = getStateCode(data?.Customer?.address?.state);
  
    const isIntraTrade = !data?.Customer ? true : shopStateCode === customerStateCode;
  
    const totalDetails = billCalculation({
      data: data?.items,
      isIntraTrade,
    });
  
    console.log({ totalDetails });
  
    const cumulativeReport = [
      {
        label: "Total Items",
        symbol: "",
        field: totalDetails?.totalItems,
      },
      {
        label: "Taxable Value",
        field: totalDetails?.discountedTaxableValue,
        color: "purple",
        symbol: "+",
      },
      {
        label: "Central GST",
        field: totalDetails?.discountedCgstTotal,
        symbol: "+",
        color: "pink",
      },
      {
        label: "State GST",
        field: totalDetails?.discountedSgstTotal,
        symbol: "+",
        color: "orange",
      },
      {
        label: "Integrated GST",
        field: totalDetails?.discountedIgstTotal,
        symbol: "+",
        color: "fuchsia",
      },
      {
        label: "Discounted Amount",
        field: (
          totalDetails?.nonDiscountedTotal - totalDetails?.discountedTotal
        ).toFixed(2),
        symbol: "-",
        color: "red",
      },
      {
        label: "Rounded Off",
        field: totalDetails?.discountedRounded?.value,
        symbol: totalDetails?.discountedRounded?.symbol,
      },
    ];

    return {
        ...data,
        cumulativeReport,
        total: totalDetails?.discountedRounded?.total,
        shopStateCode,
        customerStateCode,
    }
}