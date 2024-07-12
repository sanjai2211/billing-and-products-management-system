"use client";

import { PageHeader } from "@/lib/components";
import { DataTable } from "@/lib/tables/my-products/data-table";
import { columns } from "@/lib/tables/my-products/columns";
import { useRouter } from "next/navigation";
import { useAddEditDeleteProduct } from "@/lib/hooks";

export default function MyProductsScreen({ products, session }: any) {
  // const colData = getProductColumns(session?.shopId)
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
    <div>
      <PageHeader title={`My Products`} />
      <DataTable
        data={products}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelte}
      />
    </div>
  );
}
