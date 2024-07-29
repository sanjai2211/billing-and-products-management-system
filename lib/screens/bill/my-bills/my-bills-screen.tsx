"use client";

import { ExportButton, PageHeader } from "@/lib/components";
import { columns } from "@/lib/tables/bills/columns";
import { useRouter } from "next/navigation";
import { useAddEditDeleteProduct } from "@/lib/hooks";
import { DataTable } from "@/lib/tables/bills/data-table";
import { ExportOptionsMyBills } from "@/lib/constants";


export default function MyBillsScreen({ bills, session }: any) {
  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push(`/add-product/${id}`);
  };

  const { mutate: onSubmit } = useAddEditDeleteProduct({
    shopId: session?.shopId,
    method: "DELETE",
  });

  const handleDelte = (id: String) => onSubmit({ productId: id });
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <PageHeader title={`My Bills`} />{" "}
        <ExportButton data={ExportOptionsMyBills} exportData={bills} />
      </div>

      <DataTable
        data={bills}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelte}
      />
    </div>
  );
}
