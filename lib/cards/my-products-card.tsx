"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Field = ({ title, value }: any) => {
  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md">
      <p className="text-xs opacity-50">{title}</p>
      <p className="text-sm">{value || "-"}</p>
    </div>
  );
};

const getColor = (field: any, value?: any) => {
  switch (field) {
    case "rate":
      if (value === 0 || !value) {
        return "text-red-500";
      } else return "text-green-500";
    case "percentage":
      return "text-purple-500";
  }
};

export default function MyProductsCard({ products }: any) {
  console.log({ products });
  return (
    <div className="grid grid-cols-3 gap-4">
      {products?.map((product: any) => (
        <div className="border p-4 rounded-lg shadow-md space-y-4 w-full">
          <div className="flex gap-2 items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{product.productName}</h2>
              <div className="flex place-items-center gap-1 opacity-50">
                <p className="opacity-50 text-xs">as</p>
                <p className="text-sm">{product?.printName}</p>
                <p className="opacity-50 text-xs">in Bill</p>
              </div>
            </div>
            <div className="space-y-0.5">
              <p className="border border-dashed w-fit p-2.5 rounded-md">
                PROD - {product.code}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center w-full ">
            <Field title="Open Stock" value={`${product.openStock || 0}`} />
            <Field title="Status" value={product.status} />
            <Field
              title="Stock Value"
              value={
                product?.stockValue
                  ? `${product?.stockValue} ${product?.unit}`
                  : `0 ${product?.unit}`
              }
            />
          </div>

          <div className="flex gap-2 items-center">
            <div className="rounded-md border w-full">
              <Table>
                <TableBody>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">Cost</TableCell>
                    <TableCell className="text-sm">
                      <span className={`${getColor("rate", product.cost)}`}>
                        &#8377;{" "}
                      </span>{" "}
                      {product.cost || 0}
                    </TableCell>
                  </TableRow>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">MRP</TableCell>
                    <TableCell className="text-sm">
                      <span className={`${getColor("rate", product.mrp)}`}>
                        &#8377;
                      </span>{" "}
                      {product.mrp || 0}
                    </TableCell>
                  </TableRow>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">
                      Purchase Rate
                    </TableCell>
                    <TableCell className="text-sm">
                      <span
                        className={`${getColor("rate", product.purchaseRate)}`}
                      >
                        &#8377;
                      </span>{" "}
                      {product.purchaseRate || 0}
                    </TableCell>
                  </TableRow>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">
                      Sales Rate
                    </TableCell>
                    <TableCell className="text-sm">
                      <span
                        className={`${getColor("rate", product.salesRate)}`}
                      >
                        &#8377;
                      </span>{" "}
                      {product.salesRate || 0}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="rounded-md border w-full">
              <Table>
                <TableBody>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">
                      GST Purchase
                    </TableCell>
                    <TableCell className="text-sm">
                      {product.gstPurchase || 0}{" "}
                      <span className={`${getColor("percentage")}`}>%</span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">
                      GST Sales
                    </TableCell>
                    <TableCell className="text-sm">
                      {product.gstSales || 0}{" "}
                      <span className={`${getColor("percentage")}`}>%</span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">
                      IGST Purchase
                    </TableCell>
                    <TableCell className="text-sm">
                      {product.igstPurchase || 0}{" "}
                      <span className={`${getColor("percentage")}`}>%</span>
                    </TableCell>
                  </TableRow>
                  <TableRow className="divide-x">
                    <TableCell className="text-xs opacity-50">
                      IGST Sales
                    </TableCell>
                    <TableCell className="text-sm">
                      {product.igstSales || 0}{" "}
                      <span className={`${getColor("percentage")}`}>%</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="grid grid-cols-2 items-center  divide-x rounded-md gap-2 border p-2">
            <div className="flex flex-col gap-2 pr-4">
              <p className="text-xs opacity-50">Brand</p>
              <p className="text-sm">{product.brand || "-"}</p>
            </div>
            <div className="flex flex-col gap-2 pl-4">
              <p className="text-xs opacity-50">Category</p>
              <p className="text-sm">{product.category || "-"}</p>
            </div>
          </div>

          {/* <p>
    <strong>Category:</strong> {product.category}
  </p>
  <p>
    <strong>Unit:</strong> {product.unit}
  </p>
  <p>
    <strong>Group:</strong> {product.group}
  </p>
  <p>
    <strong>Brand:</strong> {product.brand}
  </p>
  <p>
    <strong>Cost:</strong> {product.cost}
  </p>
  <p>
    <strong>MRP:</strong> {product.mrp}
  </p>
  <p>
    <strong>Purchase Rate:</strong> {product.purchaseRate}
  </p>
  <p>
    <strong>Sales Rate:</strong> {product.salesRate}
  </p>
  <p>
    <strong>GST Purchase:</strong> {product.gstPurchase}
  </p>
  <p>
    <strong>GST Sales:</strong> {product.gstSales}
  </p>
  <p>
    <strong>IGST Purchase:</strong> {product.igstPurchase}
  </p>
  <p>
    <strong>IGST Sales:</strong> {product.igstSales}
  </p>
  <p>
    <strong>HSN Code:</strong> {product.hsnCode}
  </p>
  <p>
    <strong>Open Stock:</strong> {product.openStock}
  </p>
  <p>
    <strong>Stock Value:</strong> {product.stockValue}
  </p>
  <p>
    <strong>Status:</strong> {product.status}
  </p>
  <p>
    <strong>Created At:</strong> {formatDate(product.createdAt)}
  </p> */}
        </div>
      ))}
    </div>
  );
}
