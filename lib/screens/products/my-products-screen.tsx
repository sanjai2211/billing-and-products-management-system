"use client";

import { PageHeader } from "@/lib/components";
import { DataTable } from "@/lib/tables/my-products/data-table";
import { columns } from "@/lib/tables/my-products/columns";

export default function MyProductsScreen({ products }: any) {
  return (
    <div>
      <PageHeader title={`My Products`} />
      <DataTable data={products} columns={columns} />
    </div>
  );
}
