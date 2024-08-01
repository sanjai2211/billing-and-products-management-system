"use client";

import { PageHeader } from "@/lib/components";
import { DataTable } from "@/lib/tables/my-customers/data-table";
import { columns } from "@/lib/tables/my-customers/columns";
import { useRouter } from "next/navigation";
import { useAddEditDeleteProduct } from "@/lib/hooks";

export default function MyCustomersScreen({ customers, session }: any) {
  // const colData = getProductColumns(session?.shopId)
  const router = useRouter();
  const handleEdit = ({id}: any) => {
    console.log(id)
    router.push(`/add-customer/${id}`);
  };

  const { mutate: onSubmit } = useAddEditDeleteProduct({
    shopId: session?.shopId,
    method: "DELETE",
  });

  const handleDelte = (id: String) => onSubmit({ productId: id });
  return (
    <div>
      <PageHeader title={`My Customers`} />
      <DataTable
        data={customers}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelte}
      />
    </div>
  );
}
