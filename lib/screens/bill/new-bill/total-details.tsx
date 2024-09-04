"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ShopDetailsSchema } from "@/lib/form-schema";
import { BillData, BillDetails, ShopDetails } from "@/lib/constants";
import {
  PageHeader,
  SectionWithDynamicFields,
  SectionWithAddableFields,
  Section,
  DynamicInputField,
  FieldWithBoxValues,
} from "@/lib/components";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useAddEditShop } from "@/lib/hooks";
import { Icon } from "@/lib/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import AddBill from "./add-bill";
import { numberToWords } from "@/lib/utils-helper/calculation/numberToWord";
import {
  calculateDiscountPercentage,
  calculatePercentage,
} from "@/lib/utils-helper/calculation/percentage";
import { roundedOff } from "@/lib/utils-helper/calculation/roundedOff";
import { Toggle } from "@/components/ui/toggle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TotalDetails({ totalDetails, form }: any) {
  const [showDetails, setShowDetails] = useState(false);

  const {
    discountedTotal,
    nonDiscountedTotal,
    discountedTaxableValue,
    nonDiscountedTaxableValue,
    discountedCgstTotal,
    nonDiscountedCgstTotal,
    discountedSgstTotal,
    nonDiscountedSgstTotal,
    discountedIgstTotal,
    nonDiscountedIgstTotal,
    discountedAmount,
    discountedPercentage,
    discountedRounded,
    nonDiscountedRounded,
  } = totalDetails;

  const detailedTableReport = [
    {
      row: [
        {
          cell: "Total",
        },
        {
          field: totalDetails?.nonDiscountedTaxableValue,
          color: "cyan",
        },
        {
          field: totalDetails?.discountedTaxableValue,
          color: "purple",
          symbol: "+",
        },
        {
          field: (
            totalDetails?.nonDiscountedTaxableValue -
            totalDetails?.discountedTaxableValue
          ).toFixed(2),
        },
      ],
    },
    {
      row: [
        {
          cell: "CGST",
        },
        {
          field: totalDetails?.nonDiscountedCgstTotal,
        },
        {
          field: totalDetails?.discountedCgstTotal,
          color: "pink",
          symbol: "+",
        },
        {
          field: (
            totalDetails?.nonDiscountedCgstTotal -
            totalDetails?.discountedCgstTotal
          ).toFixed(2),
        },
      ],
    },
    {
      row: [
        {
          cell: "SGST",
        },
        {
          field: totalDetails?.nonDiscountedSgstTotal,
        },
        {
          field: totalDetails?.discountedSgstTotal,
          color: "orange",
          symbol: "+",
        },
        {
          field: (
            totalDetails?.nonDiscountedSgstTotal -
            totalDetails?.discountedSgstTotal
          ).toFixed(2),
        },
      ],
    },
    {
      row: [
        {
          cell: "IGST",
        },
        {
          field: totalDetails?.nonDiscountedIgstTotal,
        },
        {
          field: totalDetails?.discountedIgstTotal,
          color: "fuchsia",
          symbol: "+",
        },
        {
          field: (
            totalDetails?.nonDiscountedIgstTotal -
            totalDetails?.discountedIgstTotal
          ).toFixed(2),
        },
      ],
    },
    {
      row: [
        {
          cell: "Total",
        },
        {
          cell: totalDetails?.nonDiscountedTotal,
        },
        {
          cell: totalDetails?.discountedTotal,
          color: "yellow",
        },
        {
          field: (
            totalDetails?.nonDiscountedTotal - totalDetails?.discountedTotal
          ).toFixed(2),
          color: "red",
          symbol: "-",
        },
      ],
    },
    // {
    //   row: [
    //     {
    //       cell: "Round",
    //     },
    //     {
    //       field: totalDetails?.nonDiscountedRounded.value,
    //       symbol: totalDetails?.nonDiscountedRounded.symbol,
    //     },
    //     {
    //       field: totalDetails?.discountedRounded.value,
    //       symbol: totalDetails?.discountedRounded.symbol,
    //     },
    //     {
    //       field: totalDetails?.nonDiscountedRounded.value - totalDetails?.discountedRounded.value
    //     },
    //   ],
    // },
    // {
    //   row: [
    //     {
    //       cell: "Total",
    //     },
    //     {
    //       field: totalDetails?.nonDiscountedRounded?.total,
    //     },
    //     {
    //       field: totalDetails?.discountedRounded?.total,
    //     },
    //     {
    //       field: (
    //         totalDetails?.nonDiscountedRounded?.total - totalDetails?.discountedRounded?.total
    //       ).toFixed(2),
    //       color: "red",
    //       symbol: "-",
    //     },
    //   ],
    // },
  ];

  const tableHeaders = [
    "Content",
    "Pre Discount",
    "Post Discount",
    "Discounted Amount",
  ];

  const detailedReport = [
    {
      sectionName: "Product Value",
      // totalField: "Total",
      // total: totalDetails?.nonDiscountedTotal - totalDetails?.discountedAmount,
      // color: "purple",
      items: [
        {
          label: "Taxable Value",
          field: totalDetails?.nonDiscountedTaxableValue,
        },
        // {
        //   label: "Discounted Amount",
        //   field: totalDetails?.discountedAmount,
        //   symbol: "-",
        //   color: "red",
        // },
        // {
        //   label: "Discounted Percentage",
        //   field: totalDetails?.discountedPercentage,
        //   symbol: "%",
        // },
      ],
    },
    {
      sectionName: "Taxes",
      totalField: "Total",
      total: totalDetails?.discountedTotalTax,
      color: "yellow",
      items: [
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
        // {
        //   label: "Reduction in Taxes",
        //   field: totalDetails?.discountedTotalTax,
        //   symbol: "-",
        //   color: "red",
        // },
      ],
    },
    {
      sectionName: "Discount",
      totalField: "Total",
      total: (
        parseFloat(totalDetails?.discountedAmount) +
        parseFloat(totalDetails?.discountReductionInTax)
      ).toFixed(2),
      color: "red",
      items: [
        {
          label: "Discounted Amount",
          field: totalDetails?.discountedAmount,
          symbol: "-",
        },
        {
          label: "Reduction in Taxes",
          field: totalDetails?.discountReductionInTax,
          symbol: "-",
        },
      ],
    },
    {
      sectionName: "Summary",
      totalField: "Total",
      total:
        totalDetails?.discountedTotal +
        totalDetails?.discountedCgstTotal +
        totalDetails?.discountedSgstTotal +
        totalDetails?.discountedIgstTotal,
      items: [
        {
          label: "Total Value",
          field: totalDetails?.discountedTotal,
          color: "purple",
        },
        {
          label: "Total Tax",
          field: totalDetails?.discountedTotalTax,
          symbol: "+",
          color: "yellow",
        },
      ],
    },
    {
      items: [
        {
          label: "Rounded Off",
          field: totalDetails?.discountedRounded?.value,
          symbol: totalDetails?.discountedRounded?.symbol,
          color: "black",
        },
      ],
    },
  ];
  const cumulativeReport = [
    {
      label: "Total Items",
      field: totalDetails?.totalItems,
    },
    {
      label: "Taxable Value",
      field: totalDetails?.discountedTaxableValue,
      color: "purple",
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

  return (
    <div className="border w-full h-full rounded-md p-4 space-y-8">
      <div className="flex justify-between items-start">
        <p>Bill details</p>

        {/* <div
          className={`${
            showDetails ? " bg-muted " : " border"
          } p-1 cursor-pointer rounded-md `}
          onClick={() => setShowDetails(!showDetails)}
        >
          <Icon name="Percent" className="h-4 w-4" />
        </div> */}
      </div>
      {showDetails ? (
        <div className="space-y-8 max-h-[field(100vh-230px)] h-full hide-scrollbar overflow-y-auto">
          <div className="rounded-md border h-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow className="divide-x">
                  {tableHeaders.map((header, index) => (
                    <TableHead key={index} className="text-xs bg-muted">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailedTableReport?.map((report, index) => (
                  <TableRow key={index} className="divide-x relative">
                    {report.row.map((cellData: any, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className={`w-40 ${
                          cellData?.cell ? "bg-muted opacity-50" : ""
                        }`}
                      >
                        <div className="flex gap-1">
                          <p className="text-xs">{cellData?.symbol}</p>
                          <p className={`text-xs text-${cellData?.color}-500`}>
                            {cellData.cell || cellData.field || "0.00"}
                          </p>
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {/* {detailedReport?.map((data) => (
            <div>
              <p className="text-sm opacity-50">{data?.sectionName}</p>
              <div className="border mb-2" />
              <div className="space-y-2">
                {data?.items?.map((item: any) => (
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm opacity-75">{item?.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm">{item?.symbol}</p>
                      <p className={`text-${item?.color}-500 font-semibold`}>
                        {item?.field || "0.00"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {data?.total && (
                <>
                  <div className="border my-2" />
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs opacity-50">{data?.totalField}</p>
                    <p className={`text-${data?.color}-500 font-bold`}>
                      &#8377; {data?.total}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))} */}
        </div>
      ) : (
        <div className="space-y-8">
          {cumulativeReport?.map((item) => (
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm">{item?.label}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">{item?.symbol}</p>
                <p className={`text-${item?.color}-500 font-semibold`}>
                  {item?.field || "0.00"}
                </p>
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2 border p-2 rounded-sm ">
              <p>Total</p>
              <div className="flex items-center gap-2">
                <p className="text-sm"> &#8377;</p>
                <p className="text-green-500 font-bold text-xl">
                  {totalDetails?.discountedRounded?.total}
                </p>
              </div>
            </div>
            {/* {discountedRounded?.total &&
              discountedRounded?.total !== "0.00" && (
                <p className="text-sm text-blue-500">
                  {numberToWords(discountedRounded?.total)} Only
                </p>
              )} */}
            {/* <DynamicInputField
              form={form}
              data={{
                id: "discountedAmount",
                label: "Discount Amount",
                placeholder: "Discount Amount",
                component: "inputField",
              }}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
}
